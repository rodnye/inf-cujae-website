'use client';
import { useEffect, useState } from 'react';
import { BlogEntry } from '@/types/blog-entry';
import {
  createBlogEntry,
  deleteBlogEntry,
  fetchBlogEntries,
  fetchBlogEntry,
  uploadBlogCover,
} from '../_services/blog-api';
import { AdminForm } from '@/components/sections/AdminForm';
import { blogFieldConfig, emptyBlogFields } from './blogAdminConfig';
import { ListManager } from '@/components/sections/ListManager';
import {
  FaEye,
  FaTrash,
  FaUpload,
  FaBookAtlas,
  FaArrowLeft,
} from 'react-icons/fa6';
import { EventEntry } from '@/types/event-entry';

export function BlogAdminPage() {
  const [blogEntries, setBlogEntries] = useState<string[]>([]);
  const [form, setForm] = useState<BlogEntry>({ ...emptyBlogFields });
  const [error, setError] = useState<string | null>(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);

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
  }, [reloadTrigger]);

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
      try {
        const data = await deleteBlogEntry(slug);
        setReloadTrigger((prev) => prev + 1);
        alert(data.message);
      } catch (e) {
        if (e instanceof Error) setError(e.message);
      }
    }
  };
  const handleUploadCover = async (slug: string) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.onchange = async () => {
      if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        try {
          const result = await uploadBlogCover(slug, file);
          alert(result.message || 'Imagen de portada subida exitosamente');
        } catch (e) {
          if (e instanceof Error) setError(e.message);
        }
      }
    };

    fileInput.click();
  };

  const handleSubmit = async () => {
    try {
      form.tags.shift(); // remove the first input tag
      const result = await createBlogEntry(form);
      alert(result.message || 'Entrada de blog creada exitosamente');
      setReloadTrigger((prev) => prev + 1);

      // reset
      setForm({ ...emptyBlogFields });
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
            <button
              onClick={() => window.history.back()}
              className="rounded-lg border border-[#36454F]/50 bg-[#36454F]/20 p-3 text-slate-400 transition-colors hover:border-yellow-500/50 hover:text-yellow-400"
              aria-label="Volver atrás"
            >
              <FaArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-3">
                <FaBookAtlas className="h-8 w-8 text-purple-400" />
              </div>
              <div>
                <h1 className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-3xl font-bold text-transparent">
                  Panel de Administración del Blog
                </h1>
                <p className="text-slate-400">Gestiona artículos y contenido</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Lista de Entradas */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-[#36454F]/50 bg-[#36454F]/20 p-6 backdrop-blur-xl">
              <ListManager
                title="Entradas Existentes"
                items={blogEntries}
                emptyMessage="No hay artículos disponibles"
                actions={[
                  {
                    label: <FaEye />,
                    onClick: handlePreviewEntry,
                    color: 'text-slate-400 hover:text-slate-200',
                  },
                  {
                    label: <FaUpload />,
                    onClick: handleUploadCover,
                    color: 'text-blue-400 hover:text-blue-300',
                  },
                  {
                    label: <FaTrash />,
                    onClick: handleDeleteEntry,
                    color: 'text-red-400 hover:text-red-300',
                  },
                ]}
              />
            </div>
          </div>

          {/* Formulario para crear nueva entrada */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <section className="rounded-xl border border-[#36454F]/50 bg-[#36454F]/20 p-6 backdrop-blur-xl">
                <h2 className="mb-6 flex items-center gap-3 text-xl font-semibold text-slate-200">
                  <div className="rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-2">
                    <FaBookAtlas className="h-5 w-5 text-green-400" />
                  </div>
                  Crear Nueva Entrada
                </h2>
                <AdminForm
                  data={form as Omit<EventEntry, 'coverImg'>}
                  onChange={(data) => setForm(data)}
                  fieldConfig={blogFieldConfig}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                />
              </section>
            </div>
          </div>
        </div>

        {/* Stats Footer */}
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-[#36454F]/50 bg-[#36454F]/20 p-4 text-center backdrop-blur-xl">
            <div className="text-2xl font-bold text-purple-400">
              {blogEntries.length}
            </div>
            <div className="text-sm text-slate-400">Total de Artículos</div>
          </div>

          <div className="rounded-lg border border-[#36454F]/50 bg-[#36454F]/20 p-4 text-center backdrop-blur-xl">
            <div className="text-2xl font-bold text-green-400">
              {blogEntries.filter((entry) => entry.length > 0).length}
            </div>
            <div className="text-sm text-slate-400">Artículos Publicados</div>
          </div>

          <div className="rounded-lg border border-[#36454F]/50 bg-[#36454F]/20 p-4 text-center backdrop-blur-xl">
            <div className="text-2xl font-bold text-yellow-400">0</div>
            <div className="text-sm text-slate-400">Borradores</div>
          </div>
        </div>
      </div>
    </div>
  );
}
