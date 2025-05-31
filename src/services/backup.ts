import path from 'path';
import AdmZip from 'adm-zip';
import { ensureDir, readdir, remove, stat } from 'fs-extra';

const DATABASE_PATH = path.join(process.cwd(), 'database');

/**
 * Obtener buffer del zip de las carpetas
 */
export const getBackupDatabase = async (
  subdir: `/${string}`,
): Promise<Buffer> => {
  const zip = new AdmZip();
  const dirPath = path.join(DATABASE_PATH, subdir);

  const files = await readdir(dirPath);
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stats = await stat(filePath);
    if (stats.isFile()) {
      zip.addLocalFile(filePath);
    } else if (stats.isDirectory()) {
      zip.addLocalFolder(filePath, file);
    }
  }

  return zip.toBuffer();
};

/**
 * Obtener buffer del zip de toda la base de datos
 */
export const getFullBackupDatabase = async (): Promise<Buffer> => {
  const zip = new AdmZip();
  zip.addLocalFolder(DATABASE_PATH);
  return zip.toBuffer();
};

/**
 * Insertar contenido del zip en la carpeta indicada
 */
export const setDatabaseFromBackup = async (
  subdir: `/${string}`,
  buffer: Buffer,
) => {
  const zip = new AdmZip(buffer);
  const extractPath = path.join(DATABASE_PATH, subdir);
  await ensureDir(extractPath);
  zip.extractAllTo(extractPath, true);
};

/**
 * Insertar contenido del zip en toda la base de datos
 */
export const setFullDatabaseFromBackup = async (buffer: Buffer) => {
  const zip = new AdmZip(buffer);
  await remove(DATABASE_PATH);
  await ensureDir(DATABASE_PATH);
  zip.extractAllTo(DATABASE_PATH, true);
};
