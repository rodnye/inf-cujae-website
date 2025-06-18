'use client';

import { useEffect, useState } from 'react';
import {
  uploadMaterial,
  fetchMaterials,
  deleteMaterial,
} from '../_services/mats-api';
import { Button } from '@/components/buttons/Button';
import { ProgressBar } from '@/components/inputs/ProgressBar';
import { ListManager } from '@/components/sections/ListManager';

export function MatsAdminPage() {
  const [materials, setMaterials] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchMaterials();
        setMaterials(data.matsFilenames);
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

  const handleUpload = async () => {
    if (!file) {
      alert('Por favor selecciona un archivo');
      return;
    }

    try {
      setUploadProgress(0);
      const result = await uploadMaterial(file, (progress) =>
        setUploadProgress(progress),
      );
      alert(result.message || 'Archivo subido exitosamente');
      setFile(null);
      setUploadProgress(null);
    } catch (e) {
      if (e instanceof Error) setError(e.message);
      setUploadProgress(null);
    }
  };

  const handleDelete = async (filename: string) => {
    const answer = confirm(
      'Seguro que deseas eliminar el archivo ' + filename + '?',
    );
    if (answer) {
      try {
        const result = await deleteMaterial(filename);
        alert(result.message);
        setMaterials((prev) => prev.filter((mat) => mat !== filename));
      } catch (e) {
        if (e instanceof Error) setError(e.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1013] p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M9 10l3 3m0 0l3-3m-3 3V4"
                />
              </svg>
            </div>
            <div>
              <h1 className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-3xl font-bold text-transparent">
                Panel de Administración de Materiales
              </h1>
              <p className="text-slate-400">Gestiona y sube materiales</p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Lista de Materiales */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-[#36454F]/50 bg-[#36454F]/20 p-6 backdrop-blur-xl">
              <ListManager
                title="Materiales Existentes"
                items={materials}
                emptyMessage="No hay materiales disponibles"
                actions={[
                  {
                    label: 'Eliminar',
                    onClick: handleDelete,
                    color: 'text-red-600 hover:text-red-500',
                  },
                ]}
                itemDisplay={(filename) => (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">{filename}</span>
                  </div>
                )}
                className="mb-8 flex-shrink-0"
              />
            </div>
          </div>

          {/* Formulario para subir nuevo material */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <section className="rounded-xl border border-[#36454F]/50 bg-[#36454F]/20 p-6 backdrop-blur-xl">
                <h2 className="mb-6 flex items-center gap-3 text-xl font-semibold text-slate-200">
                  <div className="rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M9 10l3 3m0 0l3-3m-3 3V4"
                      />
                    </svg>
                  </div>
                  Subir Nuevo Material
                </h2>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="mb-4 block w-full rounded-lg border border-[#36454F]/50 bg-[#36454F]/20 p-2 text-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {uploadProgress !== null && (
                  <ProgressBar
                    progress={uploadProgress}
                    className="mb-4 h-2 rounded-full bg-[#36454F]/50"
                  />
                )}
                <Button onClick={handleUpload}>Subir</Button>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
