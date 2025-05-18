import { NextResponse } from 'next/server';
import { Middleware } from '.';
import { cookies } from 'next/headers';
import { verifyAdminSession } from '@/services/admin-session';

export const adminValidator = (): Middleware => async (request) => {
  const cookiesStore = await cookies();
  const adminCookie = cookiesStore.get('admin-session')?.value;

  if (!adminCookie) {
    return {
      pass: false,
      response: NextResponse.json(
        {
          error: 'Missing data',
        },
        { status: 401 },
      ),
    };
  }

  try {
    const isValid = await verifyAdminSession(adminCookie);
    if (!isValid) {
      return {
        pass: false,
        response: NextResponse.json(
          { error: 'Not authorized, and you are gay' },
          { status: 401 },
        ),
      };
    }
  } catch (error) {
    // hubo un error durante la validación
    console.log(error);
    return {
      pass: false,
      response: NextResponse.json(
        { error: 'Oooooh maigot! Server error' },
        { status: 500 },
      ),
    };
  }

  return {
    pass: true,
  };
};
