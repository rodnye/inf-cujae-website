import { BlogEntry } from '@/types/blog-entry';
import { redirect } from 'next/navigation';

async function handleResponse(response: Response) {
  if (response.status === 401) {
    return redirect('/admin/login');
  }

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.details || json.message);
  }

  return json;
}

export async function fetchBlogEntries() {
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
}

export async function fetchBlogEntry(slug: string) {
  try {
    const response = await fetch('/api/blog/' + slug);
    return (await handleResponse(response)) as BlogEntry;
  } catch (error) {
    console.error('Error solicitando el articulo ' + slug, error);
    throw error;
  }
}

export async function createBlogEntry(entryData: BlogEntry) {
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
}

export async function deleteBlogEntry(slug: string) {
  try {
    const response = await fetch('/api/blog/' + slug, {
      method: 'DELETE',
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('Error eliminando la entrada del blog:', error);
    throw error;
  }
}
