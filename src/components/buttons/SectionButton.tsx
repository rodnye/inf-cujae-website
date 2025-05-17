'use client';

import { usePathname, useRouter } from 'next/navigation';

interface ButtonProps {
  title: string;
  section: string;
}

export default function SectionButton(props: ButtonProps) {
  const router = useRouter();
  const pathname = usePathname();

  function onClickHandler(section: string) {
    router.push(pathname + '/' + section);
  }

  return (
    <button
      onClick={() => onClickHandler(props.section)}
      className="group relative overflow-hidden rounded-lg border border-[#36454F]/60 px-7 py-3 font-medium text-[#FFEA00] transition-all duration-300 hover:border-[#FFEA00]/40 hover:shadow-lg hover:shadow-[#FFEA00]/20 focus:outline-none focus:ring-2 focus:ring-[#FFEA00]/50 active:scale-95"
    >
      <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
        {props.title}
      </span>
      <span className="absolute inset-0 -z-10 bg-gradient-to-r from-[#36454F]/50 to-[#36454F]/70 opacity-50 transition-opacity duration-300 group-hover:opacity-100"></span>
    </button>
  );
}
