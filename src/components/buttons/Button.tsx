'use client';
import { usePathname, useRouter } from 'next/navigation';

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: (e: React.FormEvent) => void;
}

interface ScrollButtonProps {
  children: React.ReactNode;
  scrollTo: string;
  icon?: React.ReactNode;
}

/**
 * Boton de propósito general
 */
export const Button: React.FC<ButtonProps> = ({
  to,
  children,
  icon,
  disabled,
  onClick,
}) => {
  const router = useRouter();

  return (
    <button
      onClick={onClick || (() => to && router.push(to))}
      className="relative overflow-hidden rounded-lg border border-[#36454F]/60 px-7 py-3 font-medium text-[#FFEA00] transition-all duration-300 hover:border-[#FFEA00]/40 hover:shadow-lg hover:shadow-[#FFEA00]/20 focus:outline-none focus:ring-2 focus:ring-[#FFEA00]/50 active:scale-95"
      disabled={disabled}
    >
      <div className="relative z-10 flex items-center transition-colors duration-300 group-hover:text-white">
        {icon && <span className="pr-3">{icon}</span>}
        <span>{children}</span>
      </div>
      <span className="absolute inset-0 -z-10 bg-gradient-to-r from-[#36454F]/50 to-[#36454F]/70 opacity-50 transition-opacity duration-300 group-hover:opacity-100"></span>
    </button>
  );
};

/**
 * Boton para hacer scroll hasta un elemento
 */
export const ScrollButton: React.FC<ScrollButtonProps> = ({
  children,
  icon,
  scrollTo,
}) => {
  const handleScrollTo = () => {
    const element = document.getElementById(scrollTo);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Button onClick={handleScrollTo} icon={icon}>
      {children}
    </Button>
  );
};
