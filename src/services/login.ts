'use server';

import { randomUUID } from 'crypto';
import { cookies } from 'next/headers';
import { connectToRedis } from './redis-storage';

const redis = connectToRedis();

/**
 * Verificar API Key de administrador
 */
export const verifyApiKey = async (apiKey: string) => {
  // TODO: cambiar esto por una validación de variable de entorno
  return apiKey === 'token_secreto';
};

/**
 * Verificar el token de administración enviado por cookies (admin-session)
 */
export const verifyAdminSession = async (token: string) => {
  let session = await redis.hget('sessions', token);

  if (session) {
    if (Number(session) > Date.now()) {
      return true;
    }

    redis.hdel('sessions', token);
  }

  return false;
};

/**
 * Crear token de administración y settearlo en las cookies
 */
export const createAdminSession = async () => {
  const token = randomUUID();
  const cookiesStore = await cookies();

  await redis.hset('sessions', token, Date.now() + 60 * 60 * 60 * 1000);

  cookiesStore.set({
    name: 'admin-token',
    value: token,
    path: '/',
    expires: 60 * 60 * 60 * 1000,
  });

  return token;
};
