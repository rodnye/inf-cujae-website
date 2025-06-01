'use client';

import { useEffect, useState } from 'react';
import { BlogGrid } from '@/components/sections/BlogGrid';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blog');
        if (!response.ok) {
          throw new Error('Error al obtener los blogs');
        }
        const data = await response.json();
        setBlogs(data.slugs || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (isLoading) {
    return <div className="py-10 text-center">Cargando blogs...</div>;
  }

  if (error) {
    return <div className="py-10 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">Blogs</h1>
      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">No hay blogs disponibles.</p>
      ) : (
        <BlogGrid />
      )}
    </div>
  );
}
