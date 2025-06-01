import { notFound } from 'next/navigation';
import { withParams } from '../../_hocs/params';
import { readBlogEntry } from '@/services/blog-storage';
import { BlogEntryPage } from './BlogEntryPage';

export default withParams(['slug'] as const, async ({ params }) => {
  const post = await readBlogEntry(params.slug);

  if (!post) {
    return notFound();
  }

  return <BlogEntryPage post={post} />;
});
