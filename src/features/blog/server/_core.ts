'use server';

import { access, mkdir, writeFile, readFile } from 'fs-extra';
import path from 'path';
import {
  BLOG_BASE_PATH,
  EVENTS_INDEX_PATH,
  IEventFrontmatters,
} from './_constants';

export const ensureDirectoryExists = async (slug: string) => {
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

export const readEventsMetadata = async (): Promise<IEventFrontmatters> => {
  await ensureEventsIndexExists();
  const fileContent = await readFile(EVENTS_INDEX_PATH, 'utf8');
  return JSON.parse(fileContent);
};

export const updateEventsMetadata = async (metadata: IEventFrontmatters) => {
  await ensureEventsIndexExists();
  await writeFile(EVENTS_INDEX_PATH, JSON.stringify(metadata, null, 2));
};
