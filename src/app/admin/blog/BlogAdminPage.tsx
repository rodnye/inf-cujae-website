'use client';
import { useEffect, useState } from 'react';
import { BlogEntry } from '@/types/blog-entry';
import {
  createBlogEntry,
  deleteBlogEntry,
  fetchBlogEntries,
  fetchBlogEntry,
} from '../_services/blog-api';
import { AdminForm } from '@/components/sections/AdminForm';
import { blogFieldConfig, emptyBlogFields } from './blogAdminConfig';
import { ListManager } from '@/components/sections/ListManager';
import { FaEye, FaTrash } from 'react-icons/fa6';

export function BlogAdminPage() {
  const [blogEntries, setBlogEntries] = useState<string[]>([]);
  const [form, setForm] = useState<BlogEntry>(emptyBlogFields);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchBlogEntries();
        alert(data.message);
        setBlogEntries(data.slugs);
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
  }, [error]);

  const handlePreviewEntry = async (slug: string) => {
    const data = await fetchBlogEntry(slug);
    alert(JSON.stringify(data, null, 4));
  };

  const handleDeleteEntry = async (slug: string) => {
    const answer = confirm(
      'Seguro que deseas eliminar el articulo ' + slug + '?',
    );
    if (answer) {
      const data = await deleteBlogEntry(slug);
      alert(data.message);
    }
  };

  const handleSubmit = async () => {
    try {
      form.tags.shift(); // remove the first input tag
      const result = await createBlogEntry(form);
      alert(result.message || 'Entrada de blog creada exitosamente');

      // reset
      setForm(emptyBlogFields);
    } catch (e) {
      if (e instanceof Error) setError(e.message);
    }
  };

  return (
    <div className="px-4 py-8">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-8 text-3xl font-bold">
          Panel de Administración del Blog
        </h1>

        <ListManager
          title="Entradas Existentes"
          items={blogEntries}
          emptyMessage="No hay artículos disponibles"
          actions={[
            {
              label: <FaEye />,
              onClick: handlePreviewEntry,
            },
            {
              label: <FaTrash />,
              onClick: handleDeleteEntry,
              color: 'text-red-600',
            },
          ]}
        />

        {/* Formulario para crear nueva entrada */}
        <section className="mb-8 rounded-lg p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Crear Nueva Entrada</h2>
          <AdminForm
            data={form}
            onChange={(data) => setForm(data)}
            fieldConfig={blogFieldConfig}
            onSubmit={handleSubmit}
            className="space-y-4"
          />
        </section>
      </div>
    </div>
  );
}
