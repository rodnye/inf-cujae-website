'use client';
import { useEffect, useState } from 'react';
import { BlogEntry } from '@/types/blog-entry';
import {
  createBlogEntry,
  deleteBlogEntry,
  fetchBlogEntries,
  fetchBlogEntry,
} from '../_services/blog-api';
import { LineButton } from '@/components/buttons/LineButton';
import { AdminForm } from '@/components/sections/AdminForm';
import { blogFieldConfig, emptyBlogFields } from './blogAdminConfig';

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

        {/* Lista de entradas existentes */}
        <section className="rounded-lg p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Entradas Existentes</h2>
          {blogEntries.length === 0 ? (
            <p>No hay artículos disponibles</p>
          ) : (
            <ul className="divide-y divide-on-body">
              {blogEntries.map((slug) => (
                <li key={slug} className="py-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{slug}</span>
                    <div className="flex space-x-2">
                      <LineButton onClick={() => handlePreviewEntry(slug)}>
                        Ver
                      </LineButton>
                      <LineButton
                        onClick={() => handleDeleteEntry(slug)}
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
