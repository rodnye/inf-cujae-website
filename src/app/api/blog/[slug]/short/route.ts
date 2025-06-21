import { withMiddlewares } from '@/middlewares/lib';
import { paramsValidator } from '@/middlewares/params-validator';
import { readShortArticle } from '@/features/blog/server/read-article';
import { NextResponse } from 'next/server';

export const GET = withMiddlewares(
  [paramsValidator('slug')],
  async ({ data: { params } }) => {
    const { slug } = params as { slug: string };
    const entry = await readShortArticle(slug);
    return NextResponse.json(entry);
  },
);
