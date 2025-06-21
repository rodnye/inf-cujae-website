import { BlogCards } from '@/features/blog/ui/BlogCards';
import { HomeContent } from '@/features/home/ui/HomeContent';

export default function HomePage() {
  return <HomeContent blogSection={<BlogCards limit={3} />} />;
}
