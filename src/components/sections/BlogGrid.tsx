'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import fallbackImg from '@/assets/error_404.png';
import { ShortBlogEntry } from '@/types/blog-entry';
import { BlogCard } from './BlogCard';

type ShortBlogEntryWithId = ShortBlogEntry & { slug: string };

interface BlogGridProps {
  limit?: number; // Si no se pasa, mostrará todos
}

export const BlogGrid: React.FC<BlogGridProps> = ({ limit }) => {
  const [entries, setEntries] = useState<ShortBlogEntryWithId[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogEntries = async () => {
      try {
        setIsLoading(true);

        // Obtener todas las entradas
        const entriesResponse = await fetch(
          `/api/blog?format=short_entries${limit ? '&limit=' + limit : ''}`,
        );
        if (!entriesResponse.ok) {
          throw new Error(`HTTP error! Status: ${entriesResponse.status}`);
        }

        const { entries } = (await entriesResponse.json()) as {
          entries: ShortBlogEntryWithId[];
        };

        if (entries.length === 0) {
          setEntries([]);
          return;
        }

        // Filtrar solicitudes fallidas para aplicar fallback de imagen
        const validEntries: ShortBlogEntryWithId[] = entries.map((entry) => ({
          ...entry,
          coverImg: entry.coverImg || fallbackImg.src,
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
  }, [limit]);

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
        entries.map((entry) => (
          <div key={entry.slug} className="flex justify-center">
            <Link
              href={`/blog/${entry.slug}`}
              className="w-full max-w-[400px] transition-transform hover:scale-105"
            >
              <BlogCard
                id={entry.slug}
                coverImg={entry.coverImg!}
                title={entry.title}
                description={entry.description}
              />
            </Link>
          </div>
        ))
      )}
    </div>
  );
};
