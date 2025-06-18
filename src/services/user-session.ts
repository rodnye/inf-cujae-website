'use server';

import { randomUUID } from 'crypto';
import { cookies } from 'next/headers';
import { connectRedis, disconnectRedis } from './redis-storage';
import { readUser } from './user-storage';
import { FullUser } from '@/types/user';
import { NextRequest } from 'next/server';

// duración de la sesion
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000;

/**
 *
 */
export const verifyUserCredentials = async (cid: string, password: string) => {
  try {
    const user = await readUser(cid);

    if (!user) {
      return null;
    }

    // TODO: implementar hasheo de contraseña
    const passwordValid = user.pass === password;

    if (passwordValid) {
      return user;
    }

    return null;
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
};

/**
 * Verify user session token
 */
export const verifyUserSession = async (token: string) => {
  const redis = await connectRedis();

  try {
    const sessionData = await redis.hget('user-sessions', token);

    if (!sessionData) {
      return null;
    }

    const { userId, expires } = JSON.parse(sessionData);

    if (expires < Date.now()) {
      // sesion expirada
      await redis.hdel('user-sessions', token);
      return null;
    }

    // la sesion existe, retornar usuario
    const user = await readUser(userId);
    return user;
  } catch (error) {
    console.error('Session verification error:', error);
    return null;
  } finally {
    disconnectRedis();
  }
};

/**
 *
 */
export const createUserSession = async (user: FullUser) => {
  const token = randomUUID();
  const expires = Date.now() + SESSION_DURATION_MS;

  const redis = await connectRedis();

  try {
    await redis.hset(
      'user-sessions',
      token,
      JSON.stringify({
        userId: user.cid,
        expires,
      }),
    );

    // FIX: no se setea correctamente en el cliente, se solucionó el problema seteandolo desde el navegador
    (await cookies()).set({
      name: 'user-token',
      value: token,
      path: '/',
      expires: expires,
      httpOnly: true,
      sameSite: 'lax',
    });

    return token;
  } catch (error) {
    console.error('Session creation error:', error);
    throw error;
  } finally {
    disconnectRedis();
  }
};

/**
 * Destroy user session
 */
export const destroyUserSession = async () => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('user-token')?.value;

  if (!token) return;

  const redis = await connectRedis();

  try {
    await redis.hdel('user-sessions', token);
    cookiesStore.delete('user-token');
  } catch (error) {
    console.error('Session destruction error:', error);
  } finally {
    disconnectRedis();
  }
};

/**
 * obtener el usuario autenticado actualmente
 */
export const getCurrentUser = async (req: NextRequest) => {
  let token = (await cookies()).get('user-token')?.value;
  if (!token) {
    // si no hay token, verificar en la cabecera de la solicitud (solo para admin)
    if (req.headers.get('Admin-Token') === process.env.ADMIN_PASS) {
      token = req.headers.get('Authorization')?.replace('Bearer ', '');
    }
  }
  return token ? await verifyUserSession(token) : null;
};

/**
 * Refresh session expiration
 */
export const refreshUserSession = async (token: string) => {
  try {
    const redis = await connectRedis();
    const sessionData = await redis.hget('user-sessions', token);

    if (!sessionData) {
      return false;
    }

    const { userId } = JSON.parse(sessionData);
    const newExpires = Date.now() + SESSION_DURATION_MS;

    await redis.hset(
      'user-sessions',
      token,
      JSON.stringify({
        userId,
        expires: newExpires,
      }),
    );

    // actualizar tiempo de expiración
    (await cookies()).set({
      name: 'user-token',
      value: token,
      path: '/',
      expires: newExpires,
      sameSite: 'lax',
    });

    return true;
  } catch (error) {
    console.error('Session refresh error:', error);
    return false;
  } finally {
    disconnectRedis();
  }
};
