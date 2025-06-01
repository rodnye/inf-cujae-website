'use client';
import Image from 'next/image';
import { BlogEntry } from '@/types/blog-entry';
import { FaArrowLeft } from 'react-icons/fa6';
import { marked } from 'marked';
import './content.css';

export const BlogEntryPage = ({ post }: { post: BlogEntry }) => {
  const htmlContent = marked(post.content);

  return (
    <article className="mx-auto w-full max-w-5xl px-12 py-12">
      <button
        onClick={() => history.back()}
        className="my-6 flex cursor-pointer items-center gap-4"
      >
        <FaArrowLeft />
        <p> Regresar </p>
      </button>
      <header className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
        <div className="mb-6 text-gray-600">
          <p className="font-medium">{post.author}</p>
          <p className="text-sm">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        {post.coverImg && (
          <div className="relative mb-8 h-64 md:h-96">
            <Image
              src={post.coverImg}
              alt={post.title}
              fill
              className="rounded-lg object-cover"
            />
          </div>
        )}
      </header>

      <div
        className="container-blog flex max-w-none flex-col"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  );
};
