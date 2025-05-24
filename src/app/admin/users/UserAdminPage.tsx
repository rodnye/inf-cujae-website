'use client';

import { useEffect, useState } from 'react';
import { User } from '@/types/user';
import {
  createUser,
  deleteUser,
  fetchUsers,
  fetchUser,
  updateUser,
} from '../_services/user-api';
import { LineButton } from '@/components/buttons/LineButton';
import { AdminForm } from '@/components/sections/AdminForm';
import { emptyUserFields, userFieldConfig } from './userAdminConfig';

export function UsersAdminPage() {
  const [usersCid, setUsersCid] = useState<string[]>([]);
  const [form, setForm] = useState<User & { rpass: string }>(emptyUserFields);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchUsers();
        setUsersCid(data);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (!error) return;
    alert(error);
    setError(null);
  }, [error]);

  /**
   * View user details
   */
  const handleViewUser = async (cid: string) => {
    const data = await fetchUser(cid);
    alert(JSON.stringify(data, null, 4));
  };

  /**
   * Edit user - load user data into form
   */
  const handleEditUser = async (cid: string) => {
    try {
      const userData = await fetchUser(cid);
      setForm({
        ...userData,
        rpass: userData.pass, // Set repeat password to current password
      });
      setIsEditing(true);
    } catch (e) {
      if (e instanceof Error) setError(e.message);
    }
  };

  /**
   * Delete user
   */
  const handleDeleteUser = async (cid: string) => {
    const answer = confirm(
      '¿Seguro que deseas eliminar al usuario ' + cid + '?',
    );
    if (answer) {
      try {
        await deleteUser(cid);
        setUsersCid(usersCid.filter((user) => user !== cid));
        alert('Usuario eliminado exitosamente');
        if (isEditing && form.cid === cid) {
          // Reset form if editing the deleted user
          resetForm();
        }
      } catch (e) {
        if (e instanceof Error) setError(e.message);
      }
    }
  };

  /**
   * Reset form to initial state
   */
  const resetForm = () => {
    setForm(emptyUserFields);
    setIsEditing(false);
  };

  /**
   * Create or update user
   */
  const handleSubmit = async () => {
    if (form.pass !== form.rpass) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      if (isEditing) {
        await updateUser(form);
        alert('Usuario actualizado exitosamente');
      } else {
        await createUser(form);
        alert('Usuario creado exitosamente');
        setUsersCid([...usersCid, form.cid]);
      }
      resetForm();
    } catch (e) {
      if (e instanceof Error) setError(e.message);
    }
  };

  return (
    <div className="w-full px-4 py-8">
      <div className="mx-auto w-full">
        <h1 className="mb-8 text-3xl font-bold">
          Panel de Administración de Usuarios
        </h1>

        <div className="flex w-full flex-col md:flex-row md:justify-stretch">
          {/* Lista de usuarios existentes */}
          <section className="mb-8 flex-shrink-0 rounded-lg p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Usuarios Registrados</h2>
            {usersCid.length === 0 ? (
              <p>No hay usuarios registrados</p>
            ) : (
              <ul className="divide-y divide-on-body">
                {usersCid.map((cid) => (
                  <li key={cid} className="py-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="pr-8 font-medium">( {cid} )</span>
                      </div>
                      <div className="flex space-x-2">
                        <LineButton onClick={() => handleViewUser(cid)}>
                          Ver
                        </LineButton>
                        <LineButton
                          onClick={() => handleEditUser(cid)}
                          color="text-green-500"
                        >
                          Editar
                        </LineButton>
                        <LineButton
                          onClick={() => handleDeleteUser(cid)}
                          color="text-red-600"
                        >
                          Eliminar
                        </LineButton>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* formulario: crear/editar usuario */}
          <section className="flex w-full flex-col flex-wrap items-center rounded-lg p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">
              {isEditing ? 'Editar Usuario' : 'Registrar Nuevo Usuario'}
            </h2>

            <AdminForm
              data={form}
              onChange={(data) => setForm(data)}
              fieldConfig={userFieldConfig}
              onSubmit={handleSubmit}
              onCancel={isEditing ? resetForm : undefined}
              submitText={isEditing ? 'Actualizar' : 'Registrar'}
              className="w-full max-w-xl rounded-lg p-6 shadow-md"
            />
          </section>
        </div>
      </div>
    </div>
  );
}
