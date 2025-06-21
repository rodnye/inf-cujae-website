export type BlogFrontmatter = {
  title: string;
  date: Date;
  author: string;
  tags: string[];
  coverImg?: string;
} & (
  | { isEvent: false; startDate?: Date; expireDate?: Date }
  | { isEvent: true; startDate?: Date; expireDate: Date }
);

export type Article = BlogFrontmatter & {
  content: string;
};

export type ShortArticle = BlogFrontmatter & {
  description: string;
};
