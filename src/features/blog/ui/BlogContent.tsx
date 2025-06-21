import Image from 'next/image';
import { marked } from 'marked';
import { Article } from '@/types/blog-entry';
import { BackButton } from './BackButton';
import './BlogContent.css';

export const BlogContent: React.FC<{ post: Article }> = ({ post }) => {
  const htmlContent = marked(post.content);

  return (
    <article className="mx-auto w-full max-w-5xl px-12 py-12">
      <BackButton />
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
