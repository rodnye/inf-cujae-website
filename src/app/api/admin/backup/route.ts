import { adminValidator } from '@/middlewares/admin-validator';
import { withMiddlewares } from '@/middlewares/lib';
import { getFullBackupDatabase } from '@/services/backup';
import { NextResponse } from 'next/server';

export const GET = withMiddlewares([adminValidator()], async () => {
  const fileStream = await getFullBackupDatabase();
  return new NextResponse(fileStream, {
    headers: {
      'Content-Disposition': `attachment; filename="full-backup.zip"`,
    },
  });
});
