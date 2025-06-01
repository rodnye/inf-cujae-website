import { BlogEntry } from './blog-entry';

export type EventFrontmatter = {
  startDate?: Date;
  expireDate: Date;
};

export type EventEntry = BlogEntry & { isEvent: true };
