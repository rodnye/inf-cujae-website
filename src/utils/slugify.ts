export const slugify = (title: string): string => {
  const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const randomSuffix = Math.floor(Math.random() * 10000);
  return `${baseSlug}-${randomSuffix}`;
};
