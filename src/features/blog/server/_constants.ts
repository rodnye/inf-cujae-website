import path from 'path';
import { cwd } from 'process';

export const BLOG_BASE_PATH = path.join(cwd(), 'database', 'blog');
export const EVENTS_INDEX_PATH = path.join(
  cwd(),
  'database/events/events.json',
);

export type IEventFrontmatters = {
  [slug: string]: {
    startDate?: Date;
    expireDate: Date;
  };
};
