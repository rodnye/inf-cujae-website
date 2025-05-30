// TODO: completar este servicio
import path from 'path';

const DATABASE_PATH = path.join(process.cwd(), 'database');

/**
 * Obtener buffer del zip de las carpetas
 */
export const getBackupDatabase = async (
  subdir: `/${string}`,
): Promise<Buffer> => {
  throw new Error('Function not implemented.');
};

/**
 * Obtener buffer del zip de toda la base de datos
 */
export const getFullBackupDatabase = async (): Promise<Buffer> => {
  throw new Error('Function not implemented.');
};

/**
 * Insertar contenido del zip en la carpeta indicada
 */
export const setDatabaseFromBackup = async (
  subdir: `/${string}`,
  buffer: Buffer,
) => {
  throw new Error('Function not implemented.');
};

/**
 * Insertar contenido del zip en toda la base de datos
 */
export const setFullDatabaseFromBackup = async (buffer: Buffer) => {
  throw new Error('Function not implemented.');
};
