import Redis from 'ioredis';

let redis: Redis | null;

export const connectRedis = async () => {
  if (!redis) {
    redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6379,
      username: process.env.REDIS_USER || undefined,
      password: process.env.REDIS_PASS || undefined,
      db: Number(process.env.REDIS_DB) || 0,
    });
    return new Promise<Redis>((resolve, reject) => {
      redis!.on('ready', () => resolve(redis!));
      redis!.on('error', (err) => {
        console.error('❌ Error de conexión a Redis:', err);
        reject();
      });
    });
  }

  if (redis.status == 'close' || redis.status == 'end') {
    await redis.connect();
  }

  return redis;
};

export const disconnectRedis = async () => {
  //await redis!.quit();
  //redis = null;
};
