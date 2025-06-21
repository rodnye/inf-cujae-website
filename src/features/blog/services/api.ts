'use client';

import { Article } from '@/types/blog-entry';
import { EventEntry } from '@/types/event-entry';
import { redirect } from 'next/navigation';

const handleResponse = async (response: Response) => {
  if (response.status === 401) {
    return redirect('/admin/login');
  }

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.details || json.message);
  }

  return json;
};

export const fetchArticles = async () => {
  try {
    const response = await fetch('/api/blog');
    return (await handleResponse(response)) as {
      message: string;
      slugs: string[];
    };
  } catch (error) {
    console.error('Error solicitando las entradas del blog:', error);
    throw error;
  }
};

export const fetchArticle = async (slug: string) => {
  try {
    const response = await fetch('/api/blog/' + slug);
    return (await handleResponse(response)) as Article;
  } catch (error) {
    console.error('Error solicitando el articulo ' + slug, error);
    throw error;
  }
};

export const createArticle = async (entryData: Article | EventEntry) => {
  try {
    const response = await fetch('/api/blog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entryData),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('Error creando las entradas del blog:', error);
    throw error;
  }
};

export const deleteArticle = async (slug: string) => {
  try {
    const response = await fetch('/api/blog/' + slug, {
      method: 'DELETE',
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('Error eliminando la entrada del blog:', error);
    throw error;
  }
};

export async function uploadCover(slug: string, file: File) {
  const formData = new FormData();
  formData.append('cover', file);

  const response = await fetch(`/api/blog/${slug}/cover`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Error al subir la imagen de portada');
  }

  return response.json();
}
