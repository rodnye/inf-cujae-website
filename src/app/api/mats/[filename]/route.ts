import { withMiddlewares } from '@/middlewares/lib';
import { adminValidator } from '@/middlewares/admin-validator';
import { downloadMaterial, deleteMaterial } from '@/services/materials-storage';
import { NextResponse } from 'next/server';
import { paramsValidator } from '@/middlewares/params-validator';

export const GET = withMiddlewares(
  [paramsValidator('filename')],
  async ({ data: { params } }) => {
    const { filename } = params as { filename: string };
    const fileStream = await downloadMaterial(filename);

    return new NextResponse(fileStream, {
      headers: {
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  },
);

export const DELETE = withMiddlewares(
  [adminValidator(), paramsValidator('filename')],
  async ({ data: { params } }) => {
    const { filename } = params as { filename: string };

    try {
      await deleteMaterial(filename);

      return NextResponse.json({
        message: 'Archivo eliminado exitosamente: ' + filename,
      });
    } catch (e) {
      return NextResponse.json(
        { message: 'Error al eliminar ' + filename },
        { status: 400 },
      );
    }
  },
);
