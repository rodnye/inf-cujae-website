'use client';
import { usePathname, useRouter } from 'next/navigation';

interface Props {
  children: React.ReactNode;
  to?: string;
  icon?: React.ReactNode;
}

export const Button: React.FC<Props> = ({ to, children, icon }) => {
  function scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <button
      onClick={() => to && scrollToSection(to)}
      className="group relative overflow-hidden rounded-lg border border-[#36454F]/60 px-7 py-3 font-medium text-[#FFEA00] transition-all duration-300 hover:border-[#FFEA00]/40 hover:shadow-lg hover:shadow-[#FFEA00]/20 focus:outline-none focus:ring-2 focus:ring-[#FFEA00]/50 active:scale-95"
    >
      <div className="relative z-10 flex items-center transition-colors duration-300 group-hover:text-white">
        {icon && <span className="pr-3">{icon}</span>}
        <span>{children}</span>
      </div>
      <span className="absolute inset-0 -z-10 bg-gradient-to-r from-[#36454F]/50 to-[#36454F]/70 opacity-50 transition-opacity duration-300 group-hover:opacity-100"></span>
    </button>
  );
};
