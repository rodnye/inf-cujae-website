'use client';

import { useEffect, useState } from 'react';
import { FullUser } from '@/types/user';
import {
  createUser,
  deleteUser,
  fetchUsers,
  fetchUser,
  updateUser,
} from '@/features/profile/api';
import { AdminForm } from '@/features/ui/sections/AdminForm';
import { emptyUserFields, userFieldConfig } from './user-form.config';
import { ListManager } from '@/features/ui/sections/ListManager';
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
    alert(error); // Reverted to original alert for error messages
  }, [error]);

  const handleViewUser = async (cid: string) => {
    try {
      const data = await fetchUser(cid);
      alert(JSON.stringify(data, null, 4));
    } catch (e) {
      if (e instanceof Error) setError(e.message);
    }
  };

  const handleEditUser = async (cid: string) => {
    try {
      const userData = await fetchUser(cid);
      setForm({
        ...userData,
        rpass: userData.pass,
      });
      setIsEditing(true);
    } catch (e) {
      if (e instanceof Error) setError(e.message);
    }
  };

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
          resetForm();
        }
      } catch (e) {
        if (e instanceof Error) setError(e.message);
      }
    }
  };

  const resetForm = () => {
    setForm(emptyUserFields);
    setIsEditing(false);
  };

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
    <div className="min-h-screen bg-[#0b1013] p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-6 flex items-center gap-4">
            <div className="rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-3">
              <FaEye className="h-8 w-8 text-blue-400" />
            </div>
            <div>
              <h1 className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-3xl font-bold text-transparent">
                Panel de Administración de Usuarios
              </h1>
              <p className="text-slate-400">Gestiona usuarios registrados</p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Lista de Usuarios */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-[#36454F]/50 bg-[#36454F]/20 p-6 backdrop-blur-xl">
              <ListManager
                title="Usuarios Registrados"
                items={usersCid}
                emptyMessage="No hay usuarios registrados"
                actions={[
                  {
                    label: <FaEye />,
                    onClick: handleViewUser,
                    color: 'text-blue-400 hover:text-blue-300',
                  },
                  {
                    label: <FaEdit />,
                    onClick: handleEditUser,
                    color: 'text-green-500 hover:text-green-400',
                  },
                  {
                    label: <FaTrash />,
                    onClick: handleDeleteUser,
                    color: 'text-red-600 hover:text-red-500',
                  },
                ]}
                itemDisplay={(cid) => (
                  <div>
                    <span className="pr-8 font-medium">( {cid} )</span>
                  </div>
                )}
                className="mb-8 flex-shrink-0"
              />
            </div>
          </div>

          {/* Formulario: Crear/Editar Usuario */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <section className="rounded-xl border border-[#36454F]/50 bg-[#36454F]/20 p-6 backdrop-blur-xl">
                <h2 className="mb-6 flex items-center gap-3 text-xl font-semibold text-slate-200">
                  <div className="rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-2">
                    <FaEdit className="h-5 w-5 text-green-400" />
                  </div>
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
      </div>
    </div>
  );
}
