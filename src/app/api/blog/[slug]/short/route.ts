import { withMiddlewares } from '@/middlewares/lib';
import { paramsValidator } from '@/middlewares/params-validator';
import { readShortBlogEntry } from '@/services/blog-storage';
import { NextResponse } from 'next/server';

export const GET = withMiddlewares(
  [paramsValidator('slug')],
  async ({ data: { params } }) => {
    const { slug } = params as { slug: string };
    const entry = await readShortBlogEntry(slug);
    return NextResponse.json(entry);
  },
);
