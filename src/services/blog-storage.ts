'use server';
import {
  access,
  mkdir,
  readFile,
  writeFile,
  readdirSync,
  remove,
  existsSync,
} from 'fs-extra';
import path from 'path';
import matter from 'gray-matter';
import { BlogEntry, BlogFrontmatter, ShortBlogEntry } from '@/types/blog-entry';
import { slugify } from '@/utils/slugify';

const BLOG_BASE_PATH = path.join(process.cwd(), 'database', 'blog');
const EVENTS_INDEX_PATH = path.join(
  process.cwd(),
  'database',
  'events',
  'events.json',
);

type EventFrontmatters = {
  [slug: string]: {
    startDate?: Date;
    expireDate: Date;
  };
};

const ensureDirectoryExists = async (slug: string) => {
  const dirPath = path.join(BLOG_BASE_PATH, slug);
  try {
    await access(dirPath);
  } catch {
    await mkdir(dirPath, { recursive: true });
  }
  return dirPath;
};

const ensureEventsIndexExists = async () => {
  try {
    await access(EVENTS_INDEX_PATH);
  } catch {
    await mkdir(path.join(EVENTS_INDEX_PATH, '..'), { recursive: true });
    await writeFile(EVENTS_INDEX_PATH, JSON.stringify({}));
  }
};

const readEventsMetadata = async (): Promise<EventFrontmatters> => {
  await ensureEventsIndexExists();
  const fileContent = await readFile(EVENTS_INDEX_PATH, 'utf8');
  return JSON.parse(fileContent);
};

const updateEventsMetadata = async (metadata: EventFrontmatters) => {
  await ensureEventsIndexExists();
  await writeFile(EVENTS_INDEX_PATH, JSON.stringify(metadata, null, 2));
};

export const createBlogEntry = async (entry: BlogEntry) => {
  const slug = (entry.isEvent ? 'event-' : '') + slugify(entry.title);
  const dirPath = await ensureDirectoryExists(slug);
  const filePath = path.join(dirPath, 'index.md');
  const frontmatter = {
    title: entry.title,
    date: entry.date,
    author: entry.author,
    tags: entry.tags,
  };
  const fileContent = matter.stringify(entry.content, frontmatter);
  await writeFile(filePath, fileContent);

  if (entry.isEvent) {
    const events = await readEventsMetadata();
    events[slug] = {
      startDate: entry.startDate,
      expireDate: entry.expireDate!,
    };
    await updateEventsMetadata(events);
  }

  return slug;
};

export const readBlogEntry = async (
  slug: string,
): Promise<BlogEntry | null> => {
  const filePath = path.join(BLOG_BASE_PATH, slug, 'index.md');
  try {
    await access(filePath);
    const fileContent = await readFile(filePath, 'utf8');
    const { data, content } = matter(fileContent) as unknown as {
      data: BlogFrontmatter;
      content: string;
    };

    const blog = {
      title: data.title,
      date: data.date,
      author: data.author,
      tags: data.tags || [],
      content: content.trim(),
      coverImg: (await getCoverImageURL(slug)) || undefined,
    };

    const eventMetadata = (await readEventsMetadata())[slug];
    if (eventMetadata) {
      if (eventMetadata) {
        return {
          ...blog,
          isEvent: true,
          startDate: eventMetadata.startDate,
          expireDate: eventMetadata.expireDate,
        };
      }
    }

    return {
      ...blog,
      isEvent: false,
    };
  } catch {
    return null;
  }
};

export const updateBlogEntry = async (slug: string, entry: BlogEntry) => {
  const dirPath = await ensureDirectoryExists(slug);
  const filePath = path.join(dirPath, 'index.md');
  const frontmatter = {
    title: entry.title,
    date: entry.date,
    author: entry.author,
    tags: entry.tags,
  };
  const fileContent = matter.stringify(entry.content, frontmatter);
  await writeFile(filePath, fileContent);

  if (entry.isEvent) {
    const events = await readEventsMetadata();
    events[slug] = {
      startDate: entry.startDate,
      expireDate: entry.expireDate!,
    };
    await updateEventsMetadata(events);
  }
};

export const deleteBlogEntry = async (slug: string) => {
  const filePath = path.join(BLOG_BASE_PATH, slug);
  try {
    await remove(filePath);

    const events = await readEventsMetadata();
    if (events[slug]) {
      delete events[slug];
      await updateEventsMetadata(events);
    }

    return true;
  } catch {
    return false;
  }
};

export const listBlogEntries = async (): Promise<string[]> => {
  try {
    await access(BLOG_BASE_PATH);
    const slugs = readdirSync(BLOG_BASE_PATH);
    return slugs;
  } catch {
    return [];
  }
};

export const listEventEntries = async (): Promise<string[]> => {
  const events = await readEventsMetadata();
  return Object.keys(events);
};

export const saveBlogCoverImage = async (slug: string, imageBuffer: Buffer) => {
  const dirPath = await ensureDirectoryExists(slug);
  const coverPath = path.join(dirPath, 'cover.jpg');
  await writeFile(coverPath, imageBuffer);
  return coverPath;
};

export const existsBlogEntry = async (slug: string) => {
  return existsSync(path.join(BLOG_BASE_PATH, slug));
};

export const readBlogCoverImage = async (slug: string) => {
  const coverPath = path.join(BLOG_BASE_PATH, slug, '/cover.jpg');
  try {
    await access(coverPath);
    return await readFile(coverPath);
  } catch {
    return null;
  }
};

export const getCoverImageURL = async (slug: string) => {
  const coverPath = path.join(BLOG_BASE_PATH, slug, '/cover.jpg');
  return existsSync(coverPath) ? path.join('/api/blog', slug, '/cover') : null;
};

export const readShortBlogEntry = async (
  slug: string,
): Promise<ShortBlogEntry | null> => {
  try {
    const entry = await readBlogEntry(slug);
    if (!entry) throw new Error('Not found');

    const description = entry.content
      .replace(/[#>*_`~\-]/g, '') // eliminar azúcar sintáctica de Markdown
      .trim()
      .slice(0, 200); // acprtar a 100 letras

    return {
      ...entry,
      description:
        description.length === 200 ? description + '...' : description,
    };
  } catch {
    return null;
  }
};
