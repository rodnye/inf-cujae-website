import { withMiddlewares } from '@/middlewares';
import { adminValidator } from '@/middlewares/admin-validator';
import { deleteBlogEntry, readBlogEntry } from '@/services/blog-storage';
import { NextResponse } from 'next/server';

export const DELETE = withMiddlewares(
  [adminValidator()],
  async (_, { params }) => {
    const { slug } = await params;
    await deleteBlogEntry(slug);

    return NextResponse.json({
      message: 'Eliminado con éxito: ' + slug,
    });
  },
);

export const GET = withMiddlewares([], async (_, { params }) => {
  const { slug } = await params;
  const entry = await readBlogEntry(slug);

  return NextResponse.json(entry);
});
