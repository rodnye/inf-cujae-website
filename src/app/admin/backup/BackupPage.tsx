'use client';

import { useState } from 'react';
import { Button } from '@/components/buttons/Button';
import { ProgressBar } from '@/components/inputs/ProgressBar';
import { TextField } from '@/components/inputs/TextField';

export function BackupPage() {
  const [backupFile, setBackupFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [specificFolder, setSpecificFolder] = useState<string>('');

  const handleDownloadBackup = async () => {
    try {
      const response = await fetch('/api/admin/backup', { method: 'GET' });
      if (!response.ok) throw new Error('Error al descargar el backup');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'full-backup.zip';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error desconocido');
    }
  };

  const handleDownloadSpecificBackup = async () => {
    if (!specificFolder) {
      alert('Por favor ingresa el nombre de la carpeta');
      return;
    }

    try {
      const response = await fetch(`/api/admin/backup/${specificFolder}`, {
        method: 'GET',
      });
      if (!response.ok) throw new Error('Error al descargar el backup');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${specificFolder}-backup.zip`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error desconocido');
    }
  };

  const handleRestoreBackup = async () => {
    if (!backupFile) {
      alert('Por favor selecciona un archivo de backup');
      return;
    }

    const formData = new FormData();
    formData.append('backup', backupFile);

    try {
      setUploadProgress(0);
      const response = await fetch('/api/admin/backup', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Error al restaurar el backup');
      const result = await response.json();
      alert(result.message || 'Backup restaurado exitosamente');
      setBackupFile(null);
      setUploadProgress(null);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error desconocido');
      setUploadProgress(null);
    }
  };

  const handleRestoreSpecificBackup = async () => {
    if (!backupFile || !specificFolder) {
      alert(
        'Por favor selecciona un archivo de backup y especifica la carpeta',
      );
      return;
    }

    const formData = new FormData();
    formData.append('backup', backupFile);

    try {
      setUploadProgress(0);
      const response = await fetch(`/api/admin/backup/${specificFolder}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Error al restaurar el backup');
      const result = await response.json();
      alert(result.message || 'Backup restaurado exitosamente');
      setBackupFile(null);
      setUploadProgress(null);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error desconocido');
      setUploadProgress(null);
    }
  };

  return (
    <div className="px-4 py-8">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-8 text-3xl font-bold">Gestión de Backups</h1>

        {/* Descargar backup completo */}
        <section className="mb-8 rounded-lg p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Descargar Backup</h2>
          <Button onClick={handleDownloadBackup}>
            Descargar Backup Completo
          </Button>
        </section>

        {/* Descargar backup específico */}
        <section className="mb-8 rounded-lg p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">
            Descargar Backup Específico
          </h2>
          <TextField
            placeholder="Nombre de la carpeta"
            value={specificFolder}
            onChange={setSpecificFolder}
            className="mb-4"
          />
          <Button onClick={handleDownloadSpecificBackup}>
            Descargar Backup
          </Button>
        </section>

        {/* Restaurar backup completo */}
        <section className="mb-8 rounded-lg p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Restaurar Backup</h2>
          <input
            type="file"
            onChange={(e) => setBackupFile(e.target.files?.[0] || null)}
            className="mb-4 block w-full"
          />
          {uploadProgress !== null && (
            <ProgressBar progress={uploadProgress} className="mb-4" />
          )}
          <Button onClick={handleRestoreBackup}>Restaurar Backup</Button>
        </section>

        {/* Restaurar backup específico */}
        <section className="rounded-lg p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">
            Restaurar Backup Específico
          </h2>
          <TextField
            placeholder="Nombre de la carpeta"
            value={specificFolder}
            onChange={setSpecificFolder}
            className="mb-4"
          />
          <input
            type="file"
            onChange={(e) => setBackupFile(e.target.files?.[0] || null)}
            className="mb-4 block w-full"
          />
          {uploadProgress !== null && (
            <ProgressBar progress={uploadProgress} className="mb-4" />
          )}
          <Button onClick={handleRestoreSpecificBackup}>
            Restaurar Backup
          </Button>
        </section>
      </div>
    </div>
  );
}
