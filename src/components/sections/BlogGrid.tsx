import BlogEntry from './BlogEntry';

interface BlogGridProps {
  entries: Array<{
    img: string;
    title: string;
    content: string;
  }>;
}

export const BlogGrid: React.FC<BlogGridProps> = ({ entries }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {entries.map((entry, index) => (
        <div key={index} className="flex justify-center">
          <div className="w-full max-w-[400px]">
            <BlogEntry
              img={entry.img}
              title={entry.title}
              content={entry.content}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
