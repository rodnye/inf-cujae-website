'use server';

import { Article, BlogFrontmatter, ShortArticle } from '@/types/blog-entry';
import { access, readFile } from 'fs-extra';
import matter from 'gray-matter';
import path from 'path';
import { BLOG_BASE_PATH } from './_constants';
import { getCoverImageURL } from './read-cover';
import { readEventsMetadata } from './_core';
import { listArticles } from './list-articles';
import fallbackImg from '@/assets/error_404.png';

export type ShortArticleWithId = ShortArticle & {
  slug: string;
  coverImg: string;
};

export const readArticle = async (slug: string): Promise<Article | null> => {
  const filePath = path.join(BLOG_BASE_PATH, slug, 'index.md');
  try {
    await access(filePath);
    const fileContent = await readFile(filePath, 'utf8');
    const { data, content } = matter(fileContent) as unknown as {
      data: BlogFrontmatter;
      content: string;
    };

    const blog = {
      title: data.title,
      date: data.date,
      author: data.author,
      tags: data.tags || [],
      content: content.trim(),
      coverImg: (await getCoverImageURL(slug)) || undefined,
    };

    const eventMetadata = (await readEventsMetadata())[slug];
    if (eventMetadata) {
      if (eventMetadata) {
        return {
          ...blog,
          isEvent: true,
          startDate: eventMetadata.startDate,
          expireDate: eventMetadata.expireDate,
        };
      }
    }

    return {
      ...blog,
      isEvent: false,
    };
  } catch {
    return null;
  }
};

export const readShortArticle = async (
  slug: string,
): Promise<ShortArticle | null> => {
  try {
    const entry = await readArticle(slug);
    if (!entry) throw new Error('Not found');

    const description = entry.content
      .replace(/[#>*_`~\-]/g, '') // eliminar azúcar sintáctica de Markdown
      .trim()
      .slice(0, 200); // acprtar a 200 letras

    // FIX: esta enviando tambien la prop content
    return {
      ...entry,
      description:
        description.length === 200 ? description + '...' : description,
    };
  } catch {
    return null;
  }
};

export const getArticles = async (limit?: number) => {
  try {
    const slugs = await listArticles();
    const entries: ShortArticleWithId[] = [];

    if (limit && limit < slugs.length) {
      slugs.splice(limit, slugs.length - limit);
    }

    for (const slug of slugs) {
      const entry = await readShortArticle(slug);
      if (entry) {
        entries.push({
          ...entry,
          slug,
          coverImg: entry.coverImg || fallbackImg.src,
        });
      }
    }

    entries.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    return {
      entries,
      error: null,
    };
  } catch (err) {
    console.error('Error fetching blog entries:', err);
    return {
      entries: [],
      error: 'Error fetching blog entries. Please try again later.',
    };
  }
};
