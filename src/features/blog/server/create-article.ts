'use server';

import { slugify } from '@/features/utils/slugify';
import { Article } from '@/types/blog-entry';
import { writeFile } from 'fs-extra';
import matter from 'gray-matter';
import path from 'path';
import {
  ensureDirectoryExists,
  readEventsMetadata,
  updateEventsMetadata,
} from './_core';

export const createArticle = async (entry: Article) => {
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
