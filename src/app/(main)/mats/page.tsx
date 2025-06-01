'use client'; // Necesario para usar hooks de React como useState y useEffect

import React, { useState, useEffect } from 'react';
import {
  FaFolder,
  FaFilePdf,
  FaFileWord,
  FaFileArchive,
  FaFile,
  FaChevronRight,
  FaHome,
} from 'react-icons/fa';

interface FileItem {
  id: string;
  name: string;
  type: 'pdf' | 'word' | 'zip' | 'generic';
  size: string;
  lastModified: string;
  parentId: string | null; // null si está en la raíz
}

interface FolderItem {
  id: string;
  name: string;
  parentId: string | null; // null si está en la raíz
  // fileCount se puede calcular dinámicamente o precalcular
}

// Datos de ejemplo con jerarquía simple (parentId)
const allFolders: FolderItem[] = [
  { id: '1', name: 'Primer Año', parentId: null },
  { id: '2', name: 'Segundo Año', parentId: null },
  { id: '1-1', name: 'Matemática Discreta', parentId: '1' },
  { id: '1-2', name: 'Programación', parentId: '1' },
  { id: '2-1', name: 'Cálculo II', parentId: '2' },
];

const allFiles: FileItem[] = [
  {
    id: 'f1',
    name: 'Tema 1 - Conjuntos.pdf',
    type: 'pdf',
    size: '1.5 MB',
    lastModified: '2025-05-10',
    parentId: '1-1',
  },
  {
    id: 'f2',
    name: 'Guía de Ejercicios - Lógica.docx',
    type: 'word',
    size: '0.8 MB',
    lastModified: '2025-05-12',
    parentId: '1-1',
  },
  {
    id: 'f3',
    name: 'Intro a Python.pdf',
    type: 'pdf',
    size: '2.1 MB',
    lastModified: '2025-04-20',
    parentId: '1-2',
  },
  {
    id: 'f4',
    name: 'Proyecto Final.zip',
    type: 'zip',
    size: '10.2 MB',
    lastModified: '2025-05-25',
    parentId: '1-2',
  },
  {
    id: 'f5',
    name: 'Derivadas Parciales.pdf',
    type: 'pdf',
    size: '1.9 MB',
    lastModified: '2025-03-15',
    parentId: '2-1',
  },
  {
    id: 'f6',
    name: 'Material Raíz 1.pdf',
    type: 'pdf',
    size: '0.5 MB',
    lastModified: '2025-01-01',
    parentId: null,
  },
];

const MatsPage: React.FC = () => {
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [displayedFolders, setDisplayedFolders] = useState<FolderItem[]>([]);
  const [displayedFiles, setDisplayedFiles] = useState<FileItem[]>([]);
  const [breadcrumbs, setBreadcrumbs] = useState<
    { id: string | null; name: string }[]
  >([]);

  useEffect(() => {
    // Filtrar carpetas y archivos basados en currentFolderId
    setDisplayedFolders(
      allFolders.filter((folder) => folder.parentId === currentFolderId),
    );
    setDisplayedFiles(
      allFiles.filter((file) => file.parentId === currentFolderId),
    );

    // Construir breadcrumbs
    const newBreadcrumbs: { id: string | null; name: string }[] = [
      { id: null, name: 'Raíz' },
    ];
    let currentId = currentFolderId;
    const path: { id: string | null; name: string }[] = [];

    while (currentId) {
      const folder = allFolders.find((f) => f.id === currentId);
      if (folder) {
        path.unshift({ id: folder.id, name: folder.name });
        currentId = folder.parentId;
      } else {
        break; // Seguridad por si no se encuentra la carpeta
      }
    }
    setBreadcrumbs([...newBreadcrumbs, ...path]);
  }, [currentFolderId]);

  const handleFolderClick = (folderId: string) => {
    setCurrentFolderId(folderId);
  };

  const handleBreadcrumbClick = (folderId: string | null) => {
    setCurrentFolderId(folderId);
  };

  const getFileIcon = (type: FileItem['type']) => {
    const iconProps = { className: 'mr-3 text-xl' };
    if (type === 'pdf')
      return (
        <FaFilePdf
          {...iconProps}
          className={`${iconProps.className} text-red-500`}
        />
      );
    if (type === 'word')
      return (
        <FaFileWord
          {...iconProps}
          className={`${iconProps.className} text-blue-500`}
        />
      );
    if (type === 'zip')
      return (
        <FaFileArchive
          {...iconProps}
          className={`${iconProps.className} text-yellow-500`}
        />
      );
    return (
      <FaFile
        {...iconProps}
        className={`${iconProps.className} text-slate-500`}
      />
    );
  };

  const getFolderFileCount = (folderId: string): number => {
    const directFiles = allFiles.filter(
      (file) => file.parentId === folderId,
    ).length;
    const filesInSubfolders = allFolders
      .filter((subfolder) => subfolder.parentId === folderId)
      .reduce(
        (count, subfolder) => count + getFolderFileCount(subfolder.id),
        0,
      );
    return directFiles + filesInSubfolders;
  };

  return (
    <div className="min-h-screen bg-[--color-body] py-8 text-[--color-on-body]">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 bg-gradient-to-r from-[--color-secondary] to-amber-400 bg-clip-text text-center text-5xl font-bold tracking-tight text-transparent">
          Materiales de Estudio
        </h1>

        {/* Breadcrumbs */}
        <nav
          className="mb-6 flex items-center space-x-2 text-sm text-slate-400"
          aria-label="Breadcrumb"
        >
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.id || 'root'}>
              {index > 0 && (
                <FaChevronRight className="h-3 w-3 text-slate-500" />
              )}
              <button
                onClick={() => handleBreadcrumbClick(crumb.id)}
                className={`hover:text-[--color-secondary] hover:underline ${currentFolderId === crumb.id ? 'font-semibold text-[--color-secondary]' : ''}`}
              >
                {index === 0 && crumb.id === null ? (
                  <FaHome className="inline-block h-4 w-4" />
                ) : (
                  crumb.name
                )}
              </button>
            </React.Fragment>
          ))}
        </nav>

        {/* Sección de Carpetas */}
        {displayedFolders.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-6 text-3xl font-semibold text-sky-400">
              Carpetas
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {displayedFolders.map((folder) => (
                <div
                  key={folder.id}
                  className="transform cursor-pointer rounded-lg bg-slate-800 p-5 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-sky-500/50"
                  onClick={() => handleFolderClick(folder.id)}
                >
                  <div className="flex items-center space-x-3">
                    <FaFolder className="text-3xl text-sky-400" />
                    <div>
                      <h3 className="text-lg font-medium text-slate-100">
                        {folder.name}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {getFolderFileCount(folder.id)} elementos
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Sección de Archivos */}
        <section>
          <h2 className="mb-6 text-3xl font-semibold text-emerald-400">
            Archivos
          </h2>
          {displayedFiles.length > 0 ? (
            <div className="overflow-x-auto rounded-lg bg-slate-800 shadow-lg">
              <table className="min-w-full table-auto">
                <thead className="border-b border-slate-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                      Tamaño
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                      Última Modificación
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                      Tipo
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {displayedFiles.map((file) => (
                    <tr
                      key={file.id}
                      className="transition-colors duration-200 hover:bg-slate-700/50"
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          {getFileIcon(file.type)}
                          <a
                            href={`/api/download/${file.id}`} // Placeholder: Debería apuntar a una API de descarga
                            download={file.name}
                            className="text-sm font-medium text-slate-100 hover:text-emerald-400 hover:underline"
                            onClick={(e) => {
                              // En un escenario real, el backend manejaría la descarga.
                              // Para demostración, prevenimos la navegación y mostramos alerta.
                              e.preventDefault();
                              alert(
                                `Descargando ${file.name}... (funcionalidad no implementada)`,
                              );
                            }}
                          >
                            {file.name}
                          </a>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-400">
                        {file.size}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-400">
                        {file.lastModified}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm uppercase text-slate-500">
                        {file.type}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-slate-400">
              {displayedFolders.length === 0
                ? 'No hay carpetas ni archivos aquí.'
                : 'No hay archivos en esta carpeta.'}
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default MatsPage;
