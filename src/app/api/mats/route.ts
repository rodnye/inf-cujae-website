import { withMiddlewares } from '@/middlewares/lib';
import { adminValidator } from '@/middlewares/admin-validator';
import { uploadMaterial, listMaterials } from '@/services/materials-storage';
import { NextResponse } from 'next/server';

export const GET = withMiddlewares([], async () => {
  return NextResponse.json({
    message: 'Consulta exitosa',
    matsFilenames: await listMaterials(),
  });
});

export const POST = withMiddlewares([adminValidator()], async (request) => {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json(
      { message: 'Archivo no proporcionado' },
      { status: 400 },
    );
  }

  const filename = await uploadMaterial(file);

  return NextResponse.json({
    message: 'Archivo subido exitosamente',
    filename,
  });
});
