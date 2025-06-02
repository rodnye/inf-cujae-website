'use client';

import { useEffect, useState } from 'react';
import { FullUser } from '@/types/user';
import {
  createUser,
  deleteUser,
  fetchUsers,
  fetchUser,
  updateUser,
} from '../_services/user-api';
import { AdminForm } from '@/components/sections/AdminForm';
import { emptyUserFields, userFieldConfig } from './userAdminConfig';
import { ListManager } from '@/components/sections/ListManager';
import { FaEdit } from 'react-icons/fa';
import { FaEye, FaTrash } from 'react-icons/fa6';

export function UsersAdminPage() {
  const [usersCid, setUsersCid] = useState<string[]>([]);
  const [form, setForm] = useState<FullUser & { rpass: string }>(
    emptyUserFields,
  );
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
          <ListManager
            title="Usuarios Registrados"
            items={usersCid}
            emptyMessage="No hay usuarios registrados"
            actions={[
              {
                label: <FaEye />,
                onClick: handleViewUser,
              },
              {
                label: <FaEdit />,
                onClick: handleEditUser,
                color: 'text-green-500',
              },
              {
                label: <FaTrash />,
                onClick: handleDeleteUser,
                color: 'text-red-600',
              },
            ]}
            itemDisplay={(cid) => (
              <div>
                <span className="pr-8 font-medium">( {cid} )</span>
              </div>
            )}
            className="mb-8 flex-shrink-0"
          />

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
