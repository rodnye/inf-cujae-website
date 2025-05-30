'use client';

import { useEffect, useState } from 'react';
import {
  uploadMaterial,
  fetchMaterials,
  deleteMaterial,
} from '../_services/mats-api';
import { LineButton } from '@/components/buttons/LineButton';
import { Button } from '@/components/buttons/Button';
import { ProgressBar } from '@/components/inputs/ProgressBar'; // Importa el componente de barra de progreso
import { ListManager } from '@/components/sections/ListManager';

export function MatsAdminPage() {
  const [materials, setMaterials] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null); // Estado para el progreso de subida

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchMaterials();
        debugger;
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
      } catch (e) {
        if (e instanceof Error) setError(e.message);
      }
    }
  };

  return (
    <div className="px-4 py-8">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-8 text-3xl font-bold">
          Panel de Administración de Materiales
        </h1>

        {/* Lista de materiales existentes */}
        <ListManager
          title="Materiales Existentes"
          items={materials}
          emptyMessage="No hay materiales disponibles"
          actions={[
            {
              label: 'Eliminar',
              onClick: handleDelete,
              color: 'text-red-600',
            },
          ]}
        />

        {/* Formulario para subir nuevo material */}
        <section className="mb-8 rounded-lg p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Subir Nuevo Material</h2>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="mb-4 block w-full"
          />
          {uploadProgress !== null && (
            <ProgressBar progress={uploadProgress} className="mb-4" />
          )}
          <Button onClick={handleUpload}>Subir</Button>
        </section>
      </div>
    </div>
  );
}
