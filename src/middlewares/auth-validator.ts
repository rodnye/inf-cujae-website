// @/middlewares/auth-validator.ts
import { getCurrentUser } from '@/features/profile/server/user-session';
import { NextResponse } from 'next/server';
import { Middleware } from './lib';

export const authValidator = (): Middleware => async (req) => {
  const user = await getCurrentUser(req);

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
