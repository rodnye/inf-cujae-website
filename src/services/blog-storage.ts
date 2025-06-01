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
import { BlogEntry } from '@/types/blog-entry';
import { slugify } from '@/utils/slugify';

const BLOG_BASE_PATH = path.join(process.cwd(), 'database', 'blog');

const ensureDirectoryExists = async (slug: string) => {
  const dirPath = path.join(BLOG_BASE_PATH, slug);
  try {
    await access(dirPath);
  } catch {
    await mkdir(dirPath, { recursive: true });
  }
  return dirPath;
};

export const createBlogEntry = async (entry: BlogEntry) => {
  const slug = slugify(entry.title);
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

  return slug;
};

export const readBlogEntry = async (
  slug: string,
): Promise<BlogEntry | null> => {
  const filePath = path.join(BLOG_BASE_PATH, slug, 'index.md');
  try {
    await access(filePath);
    const fileContent = await readFile(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    return {
      title: data.title,
      date: data.date,
      author: data.author,
      tags: data.tags || [],
      content: content.trim(),
      coverImg: (await getCoverImageURL(slug)) || undefined,
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
};

export const deleteBlogEntry = async (slug: string) => {
  const filePath = path.join(BLOG_BASE_PATH, slug);
  try {
    await remove(filePath);
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
