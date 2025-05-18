export type BlogFrontmatter = {
  title: string;
  date: Date;
  author: string;
  tags: string[];
};

export type BlogEntry = BlogFrontmatter & {
  content: string;
};
