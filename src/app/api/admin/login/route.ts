import { NextRequest, NextResponse } from 'next/server';
import { createAdminSession, verifyApiKey } from '@/services/login';

interface LoginBody {
  apiKey: string;
}

export const POST = async (request: NextRequest) => {
  const { apiKey }: LoginBody = await request.json();

  if (typeof apiKey != 'string') {
    return NextResponse.json(
      { error: 'Solicitud de cuerpo incorrecto.' },
      { status: 400 },
    );
  }
  if (!(await verifyApiKey(apiKey))) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  }

  // todo bien
  const sessionToken = await createAdminSession();
  return NextResponse.json(
    {
      message: 'Autenticación completada administrador!',
      redirect: '/admin',
      sessionToken,
    },
    { status: 201 },
  );
};
