import { adminValidator } from '@/middlewares/admin-validator';
import {
  fileSchema,
  formdataValidator,
} from '@/middlewares/formdata-validator';
import { withMiddlewares } from '@/middlewares/lib';
import { paramsValidator } from '@/middlewares/params-validator';
import { getBackupDatabase, setDatabaseFromBackup } from '@/services/backup';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export const GET = withMiddlewares(
  [adminValidator(), paramsValidator('folder')],
  async ({ data: { params } }) => {
    const folder: string = params.folder;
    const buffer = await getBackupDatabase(`/${folder}`);
    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${folder}-backup-${currentDate}.zip"`,
      },
    });
  },
);

export const POST = withMiddlewares(
  [
    adminValidator(),
    formdataValidator(
      z.object({
        backup: fileSchema,
      }),
    ),
    paramsValidator('folder'),
  ],
  async (request) => {
    const folder: string = request.data.params.folder;
    const buffer = await (request.data.body.backup as File).arrayBuffer();
    await setDatabaseFromBackup(`/${folder}`, Buffer.from(buffer));

    return NextResponse.json({ message: 'Backup restaurado exitosamente.' });
  },
);
