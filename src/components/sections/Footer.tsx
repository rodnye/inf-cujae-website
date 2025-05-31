import Image from 'next/image';
import logoInforImg from '@/assets/logo_infor.png';
import instagramIcon from '@/assets/instagram-icon.svg';
import telegramIcon from '@/assets/telegram-icon.svg';

export const Footer: React.FC = () => {
  return (
    <footer className="relative mt-auto w-full bg-primary bg-opacity-95 px-6 py-12 text-white">
      <div className="mx-auto w-full max-w-screen-2xl">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              className="w-20 rounded-lg transition-transform duration-300 hover:scale-105"
              alt="Logo Infor"
              src={logoInforImg}
              width={80}
              height={80}
            />
          </div>

          {/* Redes sociales */}
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-transform duration-300 hover:scale-105"
            >
              <Image
                className="w-8"
                alt="Instagram Icon"
                src={instagramIcon}
                width={32}
                height={32}
              />
              <span className="hidden md:inline">Instagram</span>
            </a>

            <a
              href="https://web.telegram.org/k/#@informaticaCujae"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-transform duration-300 hover:scale-105"
            >
              <Image
                className="w-8"
                alt="Telegram Icon"
                src={telegramIcon}
                width={32}
                height={32}
              />
              <span className="hidden md:inline">@informaticaCujae</span>
            </a>
          </div>

          {/* Información adicional */}
          <div className="text-center text-sm md:text-right">
            <p className="mb-2">
              © {new Date().getFullYear()} Informática CUJAE. Todos los
              derechos reservados.
            </p>
            <p>
              Desarrollado por{' '}
              <a
                href="https://github.com" //TODO: Replace with actual link to development team
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FFEA00] hover:underline"
              >
                Equipo de Desarrollo
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
