'use client';

import { useState } from 'react';
import { Button } from '@/components/buttons/Button';
import { ProgressBar } from '@/components/inputs/ProgressBar';
import { TextField } from '@/components/inputs/TextField';
import { FaDatabase } from 'react-icons/fa';

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
    <div className="min-h-screen bg-[#0b1013] p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-orange-500/20 p-3">
              <FaDatabase className="h-6 w-6 text-orange-400" />
            </div>
            <div>
              <h1 className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-3xl font-bold text-transparent">
                Gestión de Backups
              </h1>
              <p className="text-slate-400">Administra y restaura backups</p>
            </div>
          </div>
        </div>

        <section className="mb-8 rounded-xl border border-[#36454F]/50 bg-[#36454F]/20 p-6 backdrop-blur-xl">
          <h2 className="mb-4 text-xl font-semibold text-slate-200">
            Descargar Backup Completo
          </h2>
          <Button onClick={handleDownloadBackup}>
            Descargar Backup Completo
          </Button>
        </section>

        <section className="mb-8 rounded-xl border border-[#36454F]/50 bg-[#36454F]/20 p-6 backdrop-blur-xl">
          <h2 className="mb-4 text-xl font-semibold text-slate-200">
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

        <section className="mb-8 rounded-xl border border-[#36454F]/50 bg-[#36454F]/20 p-6 backdrop-blur-xl">
          <h2 className="mb-4 text-xl font-semibold text-slate-200">
            Restaurar Backup Completo
          </h2>
          <input
            type="file"
            onChange={(e) => setBackupFile(e.target.files?.[0] || null)}
            className="mb-4 block w-full rounded-lg border border-[#36454F]/50 bg-[#36454F]/20 p-2 text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {uploadProgress !== null && (
            <ProgressBar
              progress={uploadProgress}
              className="mb-4 h-2 rounded-full bg-[#36454F]/50"
            />
          )}
          <Button onClick={handleRestoreBackup}>Restaurar Backup</Button>
        </section>

        <section className="rounded-xl border border-[#36454F]/50 bg-[#36454F]/20 p-6 backdrop-blur-xl">
          <h2 className="mb-4 text-xl font-semibold text-slate-200">
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
            className="mb-4 block w-full rounded-lg border border-[#36454F]/50 bg-[#36454F]/20 p-2 text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {uploadProgress !== null && (
            <ProgressBar
              progress={uploadProgress}
              className="mb-4 h-2 rounded-full bg-[#36454F]/50"
            />
          )}
          <Button onClick={handleRestoreSpecificBackup}>
            Restaurar Backup
          </Button>
        </section>
      </div>
    </div>
  );
}
