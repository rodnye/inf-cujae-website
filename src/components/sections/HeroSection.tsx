interface HeroSectionProps {
  title: string;
  image: string;
  description: string;
}

export default function HeroSection(props: HeroSectionProps) {
  return (
    <div className="group relative flex min-h-[220px] flex-row items-center overflow-hidden rounded-2xl border border-[#36454F]/40 bg-[#36454F]/20 p-8 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-[#36454F]/60 hover:shadow-[#36454F]/30">
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#36454F]/40 to-[#36454F]/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

      <div className="mr-8 flex-shrink-0">
        <img
          src={props.image}
          alt={props.title}
          className="h-48 w-48 rounded-lg border-4 border-[#FFEA00]/30 object-cover shadow-lg transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col py-4">
        <h3 className="mb-4 text-3xl font-bold text-[#FFEA00] drop-shadow-md">
          {props.title}
        </h3>

        <p className="mb-6 text-lg text-white/90">{props.description}</p>

        <div className="mt-4 h-0.5 w-16 rounded bg-gradient-to-r from-[#FFEA00]/40 to-[#FFEA00]/60 transition-all duration-300 group-hover:w-32 group-hover:from-[#FFEA00]/60 group-hover:to-[#FFEA00]/80"></div>
      </div>
    </div>
  );
}
