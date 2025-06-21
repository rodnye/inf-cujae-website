import { cache, Suspense } from 'react';

import { getArticles } from '../server/read-article';
import { BlogCard } from './BlogCard';

interface BlogGridProps {
  limit?: number;
  fallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
  emptyFallback?: React.ReactNode;
}

export const BlogCards = ({
  limit,
  fallback,
  errorFallback,
  emptyFallback,
}: BlogGridProps) => {
  return (
    <Suspense
      fallback={
        fallback || (
          <div className="flex justify-center py-10">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-secondary border-t-transparent"></div>
          </div>
        )
      }
    >
      <Children
        limit={limit}
        errorFallback={errorFallback}
        emptyFallback={emptyFallback}
      />
    </Suspense>
  );
};

async function Children({
  limit,
  errorFallback,
  emptyFallback,
}: BlogGridProps) {
  const { entries, error } = await getArticles(limit);

  if (error) {
    return (
      errorFallback || (
        <div className="col-span-3 py-8 text-center text-gray-500">
          Error al cargar las publicaciones.
        </div>
      )
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {entries.length === 0
        ? emptyFallback || (
            <div className="col-span-3 py-8 text-center text-gray-500">
              No hay publicaciones disponibles.
            </div>
          )
        : entries.map((entry) => (
            <div key={entry.slug} className="flex justify-center">
              <BlogCard
                id={entry.slug}
                coverImg={entry.coverImg}
                title={entry.title}
                description={entry.description}
              />
            </div>
          ))}
    </div>
  );
}
