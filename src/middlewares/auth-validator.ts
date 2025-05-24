// @/middlewares/auth-validator.ts
import { getCurrentUser } from '@/services/user-session';
import { NextResponse } from 'next/server';
import { Middleware } from '.';

export const authValidator = (): Middleware => async (req) => {
  const user = await getCurrentUser();

  if (!user) {
    return {
      pass: false,
      response: NextResponse.json(
        { message: 'No autorizado' },
        { status: 401 },
      ),
    };
  }

  return {
    pass: true,
    data: {
      user,
    },
  };
};
