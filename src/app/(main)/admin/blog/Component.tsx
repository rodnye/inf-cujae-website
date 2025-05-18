'use client';
import { useEffect, useState } from 'react';
import { BlogEntry } from '@/types/blog-entry';
import {
  createBlogEntry,
  deleteBlogEntry,
  fetchBlogEntries,
  fetchBlogEntry,
} from '../_services/blog-api';
import { TextField } from '@/components/inputs/TextField';
import { Button } from '@/components/buttons/Button';
import { LineButton } from '@/components/buttons/LineButton';

export function BlogAdminPage() {
  const [blogEntries, setBlogEntries] = useState<string[]>([]);
  const [form, setForm] = useState<BlogEntry>({
    title: '',
    content: '',
    author: '',
    date: new Date(),
    tags: [],
  });
  const [newTag, setNewTag] = useState('');
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

  /**
   *
   */
  const createFieldHandler = (fieldName: string) => (value: string) => {
    setForm((prev) => ({ ...prev, [fieldName]: value }));
  };

  /**
   *
   */
  const handleAddTag = () => {
    let tag = newTag.trim();
    if (tag && !form.tags.includes(tag)) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
      setNewTag('');
    }
  };

  /**
   *
   */
  const handleRemoveTag = (tagToRemove: string) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  /**
   *
   */
  const handlePreviewEntry = async (slug: string) => {
    const data = await fetchBlogEntry(slug);
    alert(JSON.stringify(data, null, 4));
  };
  /**
   *
   */
  const handleDeleteEntry = async (slug: string) => {
    const answer = confirm(
      'Seguro que deseas eliminar el articulo ' + slug + '?',
    );
    if (answer) {
      const data = await deleteBlogEntry(slug);
      alert(data.message);
    }
  };

  /**
   *
   */
  const handleSubmit = async () => {
    try {
      const result = await createBlogEntry(form);
      alert(result.message || 'Entrada de blog creada exitosamente');

      // reset
      setForm({
        title: '',
        content: '',
        author: '',
        date: new Date(),
        tags: [],
      });
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

          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="mb-1 block text-sm font-medium">
                Título
              </label>
              <TextField
                type="text"
                name="title"
                placeholder="Escribe un título..."
                value={form.title}
                onChange={createFieldHandler('title')}
                required
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="mb-1 block text-sm font-medium"
              >
                Contenido
              </label>
              <TextField
                name="content"
                value={form.content}
                onChange={createFieldHandler('content')}
                rows={6}
                required
              />
            </div>

            <div>
              <label
                htmlFor="author"
                className="mb-1 block text-sm font-medium"
              >
                Autor
              </label>
              <TextField
                type="text"
                name="author"
                value={form.author}
                onChange={createFieldHandler('author')}
                required
              />
            </div>

            <div>
              <label htmlFor="date" className="mb-1 block text-sm font-medium">
                Fecha
              </label>
              <TextField
                type="date"
                name="date"
                value={
                  form.date instanceof Date
                    ? form.date.toISOString().split('T')[0]
                    : ''
                }
                onChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    date: new Date(value),
                  }))
                }
                required
              />
            </div>

            <div>
              <label htmlFor="tags" className="mb-1 block text-sm font-medium">
                Etiquetas
              </label>
              <div className="flex items-center">
                <TextField
                  type="text"
                  value={newTag}
                  className="mr-3 flex-grow"
                  onChange={(value) => setNewTag(value)}
                  placeholder="Añadir etiqueta"
                />
                <Button onClick={handleAddTag}>Añadir</Button>
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                {form.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-on-primary"
                  >
                    {tag}
                    <button
                      className="ml-3 text-xl"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <span className="sr-only">Eliminar etiqueta</span>
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Button onClick={handleSubmit}>Listo! Crear artículo</Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
