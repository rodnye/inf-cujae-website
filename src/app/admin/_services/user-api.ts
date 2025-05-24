'use client';
import { User } from '@/types/user';

export const fetchUsers = async (): Promise<string[]> => {
  const response = await fetch('/api/users');
  if (!response.ok) throw new Error('Error fetching users');
  return (await response.json()).usersCid;
};

export const fetchUser = async (cid: string): Promise<User> => {
  const response = await fetch(`/api/users/${cid}`);
  if (!response.ok) throw new Error('Error fetching user');
  return (await response.json()).user;
};

export const createUser = async (
  user: User & { rpass: string },
): Promise<User> => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!response.ok)
    throw new Error(
      'Error creating user :' +
        JSON.stringify((await response.json()).details, null, 2),
    );
  return (await response.json()).user;
};

export const updateUser = async (
  user: User & { rpass: string },
): Promise<User> => {
  const response = await fetch('/api/users/' + user.cid, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!response.ok)
    throw new Error(
      'Error updating user :' +
        JSON.stringify((await response.json()).details, null, 2),
    );
  return (await response.json()).user;
};

export const deleteUser = async (cid: string): Promise<void> => {
  const response = await fetch(`/api/users/${cid}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error deleting user');
};
