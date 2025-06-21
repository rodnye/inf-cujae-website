import { notFound } from 'next/navigation';
import { withParams } from '@/features/ui/hocs/params';
import { readArticle } from '@/features/blog/server/read-article';
import { BlogContent } from '@/features/blog/ui/BlogContent';

export default withParams(['slug'] as const, async ({ params }) => {
  const post = await readArticle(params.slug);

  if (!post) {
    return notFound();
  }

  return <BlogContent post={post} />;
});
