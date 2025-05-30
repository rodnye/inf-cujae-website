import { withMiddlewares } from '@/middlewares/lib';
import { authValidator } from '@/middlewares/auth-validator';
import { User } from '@/types/user';
import { NextResponse } from 'next/server';

export const GET = withMiddlewares([authValidator()], async (request) => {
  const user = request.data.user as User;
  const { pass, ...userData } = user;
  return NextResponse.json({
    message: 'Perfil consultado exitosamente',
    user: userData,
  });
});

export const dynamic = 'force-dynamic';
