import { withMiddlewares } from '@/middlewares/lib';
import { adminValidator } from '@/middlewares/admin-validator';
import {
  formdataValidator,
  fileSchema,
} from '@/middlewares/formdata-validator';
import { paramsValidator } from '@/middlewares/params-validator';
import {
  readBlogCoverImage,
  saveBlogCoverImage,
} from '@/services/blog-storage';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export const GET = withMiddlewares(
  [paramsValidator('slug')],
  async ({ data: { params } }) => {
    const blogId = params.slug as string;
    const buffer = await readBlogCoverImage(blogId);

    if (!buffer) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return new NextResponse(buffer, {
      headers: {
        'Content-Disposition': `attachment; filename="${blogId}-cover.jpg"`,
      },
    });
  },
);

export const POST = withMiddlewares(
  [
    adminValidator(),
    paramsValidator('slug'),
    formdataValidator(
      z.object({
        cover: fileSchema,
      }),
    ),
  ],
  async (request) => {
    const { slug } = request.data.params as { slug: string };
    const coverFile = request.data.body.cover as File;

    try {
      const buffer = Buffer.from(await coverFile.arrayBuffer());
      await saveBlogCoverImage(slug, buffer);

      return NextResponse.json({
        message: 'Imagen de portada subida exitosamente.',
      });
    } catch (error) {
      return NextResponse.json(
        { message: 'Error al subir la imagen de portada.' },
        { status: 500 },
      );
    }
  },
);
