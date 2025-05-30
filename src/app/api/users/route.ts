import { withMiddlewares } from '@/middlewares/lib';
import { adminValidator } from '@/middlewares/admin-validator';
import { jsonBodyValidator } from '@/middlewares/json-validator';
import { createUser, listUsers } from '@/services/user-storage';
import { User } from '@/types/user';
import { NextResponse } from 'next/server';
import { z } from 'zod';

type DataBody = User & {
  rpass: string;
};

export const GET = withMiddlewares([adminValidator()], async () => {
  try {
    const usersCid = await listUsers();
    return NextResponse.json(
      { message: 'Consulta exitosa!', usersCid },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al obtener la lista de usuarios' },
      { status: 500 },
    );
  }
});

export const POST = withMiddlewares(
  [
    adminValidator(),
    jsonBodyValidator(
      z.object({
        cid: z.string().min(11),
        name: z.string().min(3),
        year: z.number(),
        pass: z.string().min(6),
        rpass: z.string(),
        email: z.string().email().optional(),
        address: z.string().optional(),
        phone: z.string().optional(),
        courseType: z.string().optional(),
        userType: z.enum(['student', 'teacher', 'admin']).optional(),
      }),
    ),
  ],
  async (request) => {
    const body = request.data.body as DataBody;

    if (body.pass != body.rpass) {
      return NextResponse.json(
        { message: 'Error, contraseñas no coinciden' },
        { status: 401 },
      );
    }

    const json = await createUser(body);

    return NextResponse.json({
      message: 'Usuario creado exitosamente: ' + JSON.stringify(json, null, 4),
    });
  },
);
