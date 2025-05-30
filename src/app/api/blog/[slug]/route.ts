import { withMiddlewares } from '@/middlewares/lib';
import { adminValidator } from '@/middlewares/admin-validator';
import { deleteBlogEntry, readBlogEntry } from '@/services/blog-storage';
import { NextResponse } from 'next/server';
import { paramsValidator } from '@/middlewares/params-validator';

export const DELETE = withMiddlewares(
  [adminValidator(), paramsValidator('slug')],
  async ({ data: { params } }) => {
    const { slug } = params as { slug: string };
    await deleteBlogEntry(slug);

    return NextResponse.json({
      message: 'Eliminado con éxito: ' + slug,
    });
  },
);

export const GET = withMiddlewares(
  [paramsValidator('slug')],
  async ({ data: { params } }) => {
    const { slug } = params as { slug: string };
    const entry = await readBlogEntry(slug);

    return NextResponse.json(entry);
  },
);
