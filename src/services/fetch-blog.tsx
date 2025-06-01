'use client';

import { BlogEntry } from '@/types/blog-entry';

export type BlogEntryWithId = BlogEntry & { id: string };

// Tipo para la respuesta de la API
type BlogApiResponse = {
  slugs: BlogEntryWithId[];
};

const API_BASE_URL = '/api/blog';

// Función helper para hacer requests
async function apiRequest<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Obtiene los blogs más recientes
 * @param limit Número de blogs (por defecto: 3)
 */
export const fetchRecentBlogs = async (
  limit = 3,
): Promise<BlogEntryWithId[]> => {
  try {
    const url = `${API_BASE_URL}?limit=${limit}`;
    const response = await apiRequest<BlogApiResponse>(url);

    if (
      Array.isArray(response.slugs) &&
      typeof response.slugs[0] === 'string'
    ) {
      const blogPromises = response.slugs
        .slice(0, limit)
        .map((slug) => fetchBlogById(slug as unknown as string));

      const blogs = await Promise.all(blogPromises);
      return blogs;
    }
    return response.slugs || [];
  } catch (error) {
    throw error;
  }
};
/**
 * Obtiene todos los blogs
 */
export const fetchAllBlogs = async (): Promise<BlogEntryWithId[]> => {
  try {
    const response = await apiRequest<BlogApiResponse>(API_BASE_URL);
    console.log('Respuesta del API (todos):', response);
    return response.slugs || [];
  } catch (error) {
    console.error('Error al obtener todos los blogs:', error);
    throw error;
  }
};

/**
 * Obtiene un blog por ID
 */
export const fetchBlogById = async (id: string): Promise<BlogEntryWithId> => {
  try {
    return await apiRequest<BlogEntryWithId>(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error(`Error al obtener el blog con ID ${id}:`, error);
    throw error;
  }
};

/**
 * Hook personalizado para usar en componentes React
 */
export const useBlogFetch = () => {
  return {
    getRecent: fetchRecentBlogs,
    getAll: fetchAllBlogs,
    getById: fetchBlogById,
  };
};
