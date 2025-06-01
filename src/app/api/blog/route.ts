import { withMiddlewares } from '@/middlewares/lib';
import { listBlogEntries } from '@/services/blog-storage';
import { NextResponse } from 'next/server';
import { adminValidator } from '@/middlewares/admin-validator';
import { jsonBodyValidator } from '@/middlewares/json-validator';
import { createBlogEntry } from '@/services/blog-storage';
import { BlogEntry } from '@/types/blog-entry';
import { z } from 'zod';

export const GET = withMiddlewares([], async () => {
  const list = await listBlogEntries();

  return NextResponse.json({
    message: 'Consulta exitosa',
    slugs: list,
  });
});

export const POST = withMiddlewares(
  [
    adminValidator(),
    jsonBodyValidator(
      z
        .object({
          title: z.string().min(5),
          author: z.string().min(5),
          date: z.string().date(),
          tags: z.array(z.string().min(3)).min(1),
          content: z.string().min(20),
        })
        .and(
          z
            .object({
              isEvent: z.literal(false),
            })
            .or(
              z.object({
                isEvent: z.literal(true),
                startDate: z.string().date().optional(),
                expireDate: z.string().date(),
              }),
            ),
        ),
    ),
  ],
  async (request) => {
    const slug = await createBlogEntry(request.data.body as BlogEntry);

    return NextResponse.json(
      {
        message: 'Articulo creado exitosamente: ' + slug,
        slug,
      },
      {
        status: 200,
      },
    );
  },
);
