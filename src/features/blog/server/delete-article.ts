'use server';

import { remove } from 'fs-extra';
import path from 'path';
import { readEventsMetadata, updateEventsMetadata } from './_core';
import { BLOG_BASE_PATH } from './_constants';

export const deleteArticle = async (slug: string) => {
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
