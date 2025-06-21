import { withMiddlewares } from '@/middlewares/lib';
import { adminValidator } from '@/middlewares/admin-validator';
import { deleteArticle } from '@/features/blog/server/delete-article';
import { readArticle } from '@/features/blog/server/read-article';
import { NextResponse } from 'next/server';
import { paramsValidator } from '@/middlewares/params-validator';

export const DELETE = withMiddlewares(
  [adminValidator(), paramsValidator('slug')],
  async ({ data: { params } }) => {
    const { slug } = params as { slug: string };
    await deleteArticle(slug);

    return NextResponse.json({
      message: 'Eliminado con éxito: ' + slug,
    });
  },
);

export const GET = withMiddlewares(
  [paramsValidator('slug')],
  async ({ data: { params } }) => {
    const { slug } = params as { slug: string };
    const entry = await readArticle(slug);
    return NextResponse.json(entry);
  },
);
