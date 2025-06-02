import { withMiddlewares } from '@/middlewares/lib';
import {
  listBlogEntries,
  listEventEntries,
  readBlogEntry,
  readShortBlogEntry,
} from '@/services/blog-storage';
import { NextResponse } from 'next/server';
import { adminValidator } from '@/middlewares/admin-validator';
import { jsonBodyValidator } from '@/middlewares/json-validator';
import { createBlogEntry } from '@/services/blog-storage';
import { BlogEntry } from '@/types/blog-entry';
import { coerce, z } from 'zod';
import { searchParamsValidator } from '@/middlewares/search-params-validator';

export const GET = withMiddlewares(
  [
    searchParamsValidator(
      z.object({
        limit: coerce.number().min(1).max(10).default(10),
        format: z
          .enum(['slugs', 'entries', 'short_entries'] as const)
          .default('slugs'),
        only_events: z.literal('true').optional(),
      }),
    ),
  ],
  async (req) => {
    const { limit, format, only_events } = req.data.searchParams as {
      limit: number;
      format: 'slugs' | 'entries';
      only_events?: 'true';
    };

    const list = !only_events
      ? await listBlogEntries()
      : await listEventEntries();

    if (format == 'slugs') {
      return NextResponse.json({
        message: 'Consulta exitosa',
        slugs: list.slice(0, limit),
      });
    }

    const entries = await Promise.all(
      list.slice(0, limit).map(async (slug) => {
        const entry =
          format == 'entries'
            ? await readBlogEntry(slug)
            : // si es short_entries
              await readShortBlogEntry(slug);

        return {
          slug,
          ...entry,
        };
      }),
    );
    const validEntries = entries.filter((e) => e !== null);

    return NextResponse.json({
      message: 'Nice!',
      entries: validEntries,
    });
  },
);

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
