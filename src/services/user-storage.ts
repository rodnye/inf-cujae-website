'use server';
import {
  access,
  mkdir,
  readFile,
  writeFile,
  readdirSync,
  remove,
} from 'fs-extra';
import path from 'path';
import { User } from '@/types/user';

const USER_BASE_PATH = path.join(process.cwd(), 'database', 'users');

const ensureUserDirectoryExists = async (cid: string) => {
  const userPath = path.join(USER_BASE_PATH, cid);
  try {
    await access(userPath);
  } catch {
    await mkdir(userPath, { recursive: true });
  }
  return userPath;
};

export const createUser = async (user: User) => {
  const userPath = await ensureUserDirectoryExists(user.cid);
  const filePath = path.join(userPath, 'user.json');
  await writeFile(filePath, JSON.stringify(user, null, 2));
  return user;
};

export const readUser = async (cid: string): Promise<User | null> => {
  const filePath = path.join(USER_BASE_PATH, cid, 'user.json');
  try {
    await access(filePath);
    const fileContent = await readFile(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch {
    return null;
  }
};

export const updateUser = async (cid: string, user: User) => {
  const userPath = await ensureUserDirectoryExists(cid);
  const filePath = path.join(userPath, 'user.json');
  await writeFile(filePath, JSON.stringify(user, null, 2));
};

export const deleteUser = async (cid: string) => {
  const userPath = path.join(USER_BASE_PATH, cid);
  try {
    await remove(userPath);
    return true;
  } catch {
    return false;
  }
};

export const listUsers = async (): Promise<string[]> => {
  try {
    await access(USER_BASE_PATH);
    const cids = readdirSync(USER_BASE_PATH);
    return cids;
  } catch {
    return [];
  }
};
