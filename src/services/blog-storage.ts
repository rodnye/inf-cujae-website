import {
  access,
  mkdir,
  readFile,
  writeFile,
  readdirSync,
  remove,
} from 'fs-extra';
import path from 'path';
import matter from 'gray-matter';
import { BlogEntry } from '@/types/blog-entry';

const BLOG_BASE_PATH = path.join(process.cwd(), 'database', 'blog');

const slugify = (title: string): string => {
  const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const randomSuffix = Math.floor(Math.random() * 10000);
  return `${baseSlug}-${randomSuffix}`;
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
