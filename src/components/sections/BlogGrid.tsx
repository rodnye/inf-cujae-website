'use client';
import { useEffect, useState } from 'react';
import BlogEntry from './BlogEntry';

interface BlogEntry {
  img: string;
  title: string;
  content: string;
}

import fallbackImg from '@/assets/error_404_image.jpeg'; // Ruta de la imagen de respaldo

export const BlogGrid: React.FC = () => {
  const [entries, setEntries] = useState<BlogEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const truncateContent = (content: string): string => {
    if (!content) return '';
    const words = content.split(' ');
    const truncated = words.slice(0, 20).join(' ');
    return truncated + (words.length > 20 ? '...' : '');
  };

  useEffect(() => {
    const fetchBlogEntries = async () => {
      try {
        setIsLoading(true);

        const slugsResponse = await fetch('/api/blog');
        if (!slugsResponse.ok) {
          throw new Error(`HTTP error! Status: ${slugsResponse.status}`);
        }

        const slugsData = await slugsResponse.json();
        if (!slugsData.slugs || !Array.isArray(slugsData.slugs)) {
          throw new Error('Formato de respuesta de API incorrecto');
        }

        if (slugsData.slugs.length === 0) {
          setEntries([]);
          return;
        }

        const entriesPromises = slugsData.slugs.map(async (slug: string) => {
          const entryResponse = await fetch(`/api/blog/${slug}`);
          if (!entryResponse.ok) {
            console.error(`Error al obtener el blog ${slug}`);
            return null;
          }
          return await entryResponse.json();
        });

        const entriesResults = await Promise.all(entriesPromises);

        const validEntries = entriesResults
          .filter((entry) => entry !== null)
          .map((entry) => ({
            ...entry,
            img: entry.img || fallbackImg, // Validar y asignar imagen de respaldo
          }));

        setEntries(validEntries);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Error al cargar publicaciones',
        );
        console.error('Error fetching blog entries:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogEntries();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-secondary border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-100 p-4 text-center text-red-700">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {entries.length === 0 ? (
        <div className="col-span-3 py-8 text-center text-gray-500">
          No hay publicaciones disponibles.
        </div>
      ) : (
        entries.map((entry, index) => (
          <div key={index} className="flex justify-center">
            <div className="w-full max-w-[400px]">
              <BlogEntry
                id={entry.title}
                img={entry.img} // Imagen ya validada
                title={entry.title}
                content={truncateContent(entry.content)}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};
