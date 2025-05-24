import { slugify } from '@/utils/slugify';
import { access, mkdir, readdir, readFile, unlink, writeFile } from 'fs-extra';
import path from 'path';

const MATERIALS_BASE_PATH = path.join(process.cwd(), 'database', 'mats');

const ensureDirectoryExists = async () => {
  try {
    await access(MATERIALS_BASE_PATH);
  } catch {
    await mkdir(MATERIALS_BASE_PATH, { recursive: true });
  }
};

export const listMaterials = async (): Promise<string[]> => {
  await ensureDirectoryExists();
  try {
    return await readdir(MATERIALS_BASE_PATH);
  } catch (error) {
    console.error('Error al listar materiales:', error);
    throw new Error('No se pudieron listar los materiales');
  }
};

export const uploadMaterial = async (file: File): Promise<string> => {
  await ensureDirectoryExists();
  const ext = path.extname(file.name);
  const name = path.basename(file.name, ext);
  const fileName = slugify(name) + ext;
  const filePath = path.join(MATERIALS_BASE_PATH, fileName);

  try {
    /**
     * TODO: cambiar por un sistema que no requiera almacenar primero en memoria los archivos
     * Posiblemente usar tus-protocol
     */
    await writeFile(filePath, Buffer.from(await file.arrayBuffer()));
    return fileName;
  } catch (error) {
    console.error('Error al subir material:', error);
    throw new Error('No se pudo subir el material');
  }
};

export const downloadMaterial = async (filename: string): Promise<Buffer> => {
  const filePath = path.join(MATERIALS_BASE_PATH, filename);

  try {
    return await readFile(filePath);
  } catch (error) {
    console.error('Error al descargar material:', error);
    throw new Error('No se pudo descargar el material');
  }
};

export const deleteMaterial = async (filename: string): Promise<void> => {
  const filePath = path.join(MATERIALS_BASE_PATH, filename);

  try {
    await unlink(filePath);
  } catch (error) {
    console.error('Error al eliminar material:', error);
    throw new Error('No se pudo eliminar el material');
  }
};
