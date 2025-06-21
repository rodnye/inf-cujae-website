import { Article } from './blog-entry';

export type EventFrontmatter = {
  startDate?: Date;
  expireDate: Date;
};

export type EventEntry = Article & { isEvent: true };
