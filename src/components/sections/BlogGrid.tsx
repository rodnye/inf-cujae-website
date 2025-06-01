'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import fallbackImg from '@/assets/error_404.png';
import { ShortBlogEntry } from '@/types/blog-entry';
import { BlogCard } from './BlogCard';

type ShortBlogEntryWithId = ShortBlogEntry & { id: string };

interface BlogGridProps {
  limit?: number; // Si no se pasa, mostrará todos
}

export const BlogGrid: React.FC<BlogGridProps> = ({ limit }) => {
  const [entries, setEntries] = useState<ShortBlogEntryWithId[]>([]);
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

        // Obtener todos los slugs
        const slugsResponse = await fetch('/api/blog');
        if (!slugsResponse.ok) {
          throw new Error(`HTTP error! Status: ${slugsResponse.status}`);
        }

        const slugsData = (await slugsResponse.json()) as { slugs: string[] };

        if (slugsData.slugs.length === 0) {
          setEntries([]);
          return;
        }

        // Aplicar límite si se especifica, sino tomar todos
        const slugsToFetch = limit
          ? slugsData.slugs.slice(0, limit)
          : slugsData.slugs;

        const entriesResults: (ShortBlogEntryWithId | null)[] =
          await Promise.all(
            slugsToFetch.map(async (slug) => {
              try {
                const entryResponse = await fetch(`/api/blog/${slug}/short`);
                if (!entryResponse.ok) {
                  console.error(`Error al obtener el blog ${slug}`);
                  return null;
                }
                return {
                  id: slug,
                  ...((await entryResponse.json()) as ShortBlogEntry),
                };
              } catch (error) {
                console.error(`Error al procesar el blog ${slug}:`, error);
                return null;
              }
            }),
          );

        console.log('Entries results:', entriesResults);

        // Filtrar solicitudes fallidas y aplicar fallback de imagen
        const validEntries: ShortBlogEntryWithId[] = entriesResults
          .filter((entry) => entry !== null)
          .map((entry) => ({
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
  }, [limit]); // Agregar limit como dependencia

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
          <div key={entry.id || index} className="flex justify-center">
            <Link
              href={`/blog/${entry.id}`}
              className="w-full max-w-[400px] transition-transform hover:scale-105"
            >
              <BlogCard
                id={entry.id}
                coverImg={entry.coverImg!}
                title={entry.title}
                description={truncateContent(entry.description)}
              />
            </Link>
          </div>
        ))
      )}
    </div>
  );
};
