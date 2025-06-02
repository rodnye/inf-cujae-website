import { withMiddlewares } from '@/middlewares/lib';
import { listEventEntries, readBlogEntry } from '@/services/blog-storage';
import { NextResponse } from 'next/server';

export const GET = withMiddlewares([], async () => {
  const slugs = await listEventEntries();

  // Get full event data for each slug
  const events = await Promise.all(
    slugs.map(async (slug) => {
      try {
        const event = await readBlogEntry(slug);
        return {
          id: slug,
          ...event,
        };
      } catch (error) {
        console.error(`Error loading event ${slug}:`, error);
        return null;
      }
    }),
  );

  // Filter out failed loads
  const validEvents = events.filter((event) => event !== null);

  return NextResponse.json({
    message: 'Consulta exitosa',
    events: validEvents,
  });
});
