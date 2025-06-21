import { withMiddlewares } from '@/middlewares/lib';
import { jsonBodyValidator } from '@/middlewares/json-validator';
import {
  createUserSession,
  verifyUserCredentials,
} from '@/features/profile/server/user-session';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export const POST = withMiddlewares(
  [
    jsonBodyValidator(
      z.object({
        cid: z.string().min(11),
        pass: z.string().min(6),
      }),
    ),
  ],
  async (request) => {
    const body = request.data.body;
    const user = await verifyUserCredentials(body.cid, body.pass);

    if (!user) {
      return NextResponse.json(
        {
          message: 'Credenciales inválidas',
        },
        { status: 401 },
      );
    }

    // crear token de sesion
    const session = await createUserSession(user);

    return NextResponse.json({
      message: 'Autenticado exitosamente!',
      redirect: '/home',
      session: session,
    });
  },
);
