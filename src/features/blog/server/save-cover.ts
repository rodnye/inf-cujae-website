'use server';

import path from 'path';
import { writeFile } from 'fs-extra';
import { ensureDirectoryExists } from './_core';

export const saveArticleCover = async (slug: string, imageBuffer: Buffer) => {
  const dirPath = await ensureDirectoryExists(slug);
  const coverPath = path.join(dirPath, 'cover.jpg');
  await writeFile(coverPath, imageBuffer);
  return coverPath;
};
