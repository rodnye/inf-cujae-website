import Redis from 'ioredis';

let redis: Redis;

export const connectRedis = async () => {
  if (!redis || redis.status == 'end' || redis.status == 'close') {
    redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6379,
      username: process.env.REDIS_USER || undefined,
      password: process.env.REDIS_PASS || undefined,
    });

    return new Promise<Redis>((resolve, reject) => {
      redis.on('ready', () => resolve(redis));
      redis.on('error', (err) => {
        console.error('❌ Error de conexión a Redis:', err);
        reject();
      });
    });
  }

  return redis;
};

export const disconnectRedis = () => {
  redis!.disconnect();
};
