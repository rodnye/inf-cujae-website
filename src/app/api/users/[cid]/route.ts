import { withMiddlewares } from '@/middlewares/lib';
import { adminValidator } from '@/middlewares/admin-validator';
import { jsonBodyValidator } from '@/middlewares/json-validator';
import { deleteUser, readUser, updateUser } from '@/services/user-storage';
import { FullUser } from '@/types/user';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export const GET = withMiddlewares(
  [adminValidator()],
  async (request, { params }) => {
    try {
      const { cid } = await params;
      const user = await readUser(cid);
      if (!user) {
        return NextResponse.json(
          { message: 'Usuario no encontrado' },
          { status: 404 },
        );
      }
      return NextResponse.json({ message: 'Consulta exitosa!', user });
    } catch (error) {
      return NextResponse.json(
        { message: 'Error al obtener el usuario' },
        { status: 500 },
      );
    }
  },
);

export const PUT = withMiddlewares(
  [
    adminValidator(),
    jsonBodyValidator(
      z.object({
        name: z.string().min(3).optional(),
        grade: z.number().optional(),
        pass: z.string().min(6).optional(),
        email: z.string().email().optional(),
      }),
    ),
  ],
  async (request, { params }) => {
    try {
      const { cid } = await params;
      const body = request.data.body as Partial<FullUser>;
      const existingUser = await readUser(cid);

      if (!existingUser) {
        return NextResponse.json(
          { message: 'Usuario no encontrado' },
          { status: 404 },
        );
      }

      const updatedUser = { ...existingUser, ...body };
      await updateUser(cid, updatedUser);

      return NextResponse.json({
        message: 'Usuario actualizado exitosamente',
        user: updatedUser,
      });
    } catch (error) {
      return NextResponse.json(
        { message: 'Error al actualizar el usuario' },
        { status: 500 },
      );
    }
  },
);

export const DELETE = withMiddlewares(
  [adminValidator()],
  async (_, { params }) => {
    try {
      const { cid } = await params;
      const success = await deleteUser(cid);
      if (!success) {
        return NextResponse.json(
          { message: 'Usuario no encontrado' },
          { status: 404 },
        );
      }
      return NextResponse.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
      return NextResponse.json(
        { message: 'Error al eliminar el usuario' },
        { status: 500 },
      );
    }
  },
);
