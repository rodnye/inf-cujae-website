'use server';

import { existsSync } from 'fs';
import { access, readFile } from 'fs-extra';
import path from 'path';
import { BLOG_BASE_PATH } from './_constants';

export const readCoverImage = async (slug: string) => {
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
