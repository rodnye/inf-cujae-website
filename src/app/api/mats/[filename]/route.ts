import { withMiddlewares } from '@/middlewares';
import { adminValidator } from '@/middlewares/admin-validator';
import { downloadMaterial, deleteMaterial } from '@/services/materials-storage';
import { NextResponse } from 'next/server';

export const GET = withMiddlewares([], async (_, { params }) => {
  const { filename } = await params;
  const fileStream = await downloadMaterial(filename);

  return new NextResponse(fileStream, {
    headers: {
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
});

export const DELETE = withMiddlewares(
  [adminValidator()],
  async (_, { params }) => {
    const { filename } = await params;
    await deleteMaterial(filename);

    return NextResponse.json({
      message: 'Archivo eliminado exitosamente: ' + filename,
    });
  },
);
