import { adminValidator } from '@/middlewares/admin-validator';
import {
  fileSchema,
  formdataValidator,
} from '@/middlewares/formdata-validator';
import { withMiddlewares } from '@/middlewares/lib';
import {
  getFullBackupDatabase,
  setFullDatabaseFromBackup,
} from '@/services/backup';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export const GET = withMiddlewares([adminValidator()], async () => {
  const buffer = await getFullBackupDatabase();
  const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="full-backup-${currentDate}.zip"`,
    },
  });
});

export const POST = withMiddlewares(
  [
    adminValidator(),
    formdataValidator(
      z.object({
        backup: fileSchema,
      }),
    ),
  ],
  async (request) => {
    const backupFile = request.data.body.backup as File;
    await setFullDatabaseFromBackup(
      Buffer.from(await backupFile.arrayBuffer()),
    );

    return NextResponse.json({ message: 'Backup restaurado exitosamente.' });
  },
);
