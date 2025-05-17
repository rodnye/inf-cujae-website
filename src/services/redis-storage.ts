import Redis from 'ioredis';

export const connectToRedis = () => {
  const redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
    username: process.env.REDIS_USER || undefined,
    password: process.env.REDIS_PASS || undefined,
  });

  redis.on('connect', () => {
    console.log('✅ Conectado a Redis correctamente');
  });

  redis.on('error', (err) => {
    console.error('❌ Error de conexión a Redis:', err);
  });

  return redis;
};
