import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';

// Define the Blog Post type
interface BlogPost {
  title: string;
  slug: string;
  content: string;
  publishedAt: string;
  author: {
    name: string;
    avatar?: string;
  };
  coverImage?: string;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`/api/blog/${slug}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.content.substring(0, 160),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
        <div className="mb-6 flex items-center text-gray-600">
          {post.author.avatar && (
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={40}
              height={40}
              className="mr-3 rounded-full"
            />
          )}
          <div>
            <p className="font-medium">{post.author.name}</p>
            <p className="text-sm">{formattedDate}</p>
          </div>
        </div>
        {post.coverImage && (
          <div className="relative mb-8 h-64 md:h-96">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="rounded-lg object-cover"
            />
          </div>
        )}
      </header>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
