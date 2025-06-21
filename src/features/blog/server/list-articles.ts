'use server';

import path from 'path';
import { access, existsSync, readdirSync } from 'fs-extra';
import { readEventsMetadata } from './_core';
import { BLOG_BASE_PATH } from './_constants';

export const existsArticle = async (slug: string) => {
  return existsSync(path.join(BLOG_BASE_PATH, slug));
};

export const listArticles = async (): Promise<string[]> => {
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
