interface BlogEntryProps {
  img: string;
  title: string;
  content: string;
}

export default function BlogEntry(props: BlogEntryProps) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-[#36454F]/40 bg-[#36454F]/20 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-[#FFEA00]/20 hover:shadow-xl hover:shadow-[#36454F]/30">
      {props.img && (
        <div className="h-60 w-full overflow-hidden">
          <img
            src={props.img}
            alt={props.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-3">
        <h2 className="mb-2 text-2xl font-bold text-[#FFEA00] drop-shadow-sm">
          {props.title}
        </h2>

        <h3 className="line-clamp-3 h-40 text-lg text-white/80">
          {props.content}
        </h3>

        <div className="mt-auto pt-4">
          <div className="h-0.5 w-10 rounded bg-gradient-to-r from-[#FFEA00]/40 to-[#FFEA00]/60 transition-all duration-300 group-hover:w-20 group-hover:from-[#FFEA00]/60 group-hover:to-[#FFEA00]/80"></div>
        </div>
      </div>
    </div>
  );
}
