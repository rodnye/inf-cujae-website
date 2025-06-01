import { withMiddlewares } from '@/middlewares/lib';
import { listEventEntries } from '@/services/blog-storage';
import { NextResponse } from 'next/server';

export const GET = withMiddlewares([], async () => {
  const list = await listEventEntries();

  return NextResponse.json({
    message: 'Consulta exitosa',
    slugs: list,
  });
});
