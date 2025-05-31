import Link from 'next/link';
import Image from 'next/image';

interface BlogEntryProps {
  id: string;
  img: string;
  title: string;
  content: string;
}

export default function BlogEntry(props: BlogEntryProps) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-[#36454F]/40 bg-[#36454F]/20 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-[#FFEA00]/20 hover:shadow-xl hover:shadow-[#36454F]/30">
      <Link href={`/blog/${props.id}`}>
        <div className="relative h-60 w-full overflow-hidden">
          <Image
            src={props.img}
            alt={props.title || 'Blog post'}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col p-3">
          <h2 className="mb-2 text-2xl font-bold text-[#FFEA00] drop-shadow-sm">
            {props.title || 'Sin título'}
          </h2>

          <h3 className="line-clamp-3 h-40 text-lg text-white/80">
            {props.content || 'No hay contenido disponible'}
          </h3>

          <div className="mt-auto pt-4">
            <div className="h-0.5 w-10 rounded bg-gradient-to-r from-[#FFEA00]/40 to-[#FFEA00]/60 transition-all duration-300 group-hover:w-20 group-hover:from-[#FFEA00]/60 group-hover:to-[#FFEA00]/80"></div>
          </div>
        </div>
      </Link>
    </div>
  );
}
