import Image from 'next/image';
import logoInforImg from '@/assets/logo_infor.png';
import { FaInstagram, FaTelegram } from 'react-icons/fa6';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-primary bg-opacity-95 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex flex-col items-center justify-start gap-6 md:flex-row">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              className="w-36 rounded-lg transition-all duration-300 hover:scale-105 md:w-24"
              alt="logoInfor"
              src={logoInforImg}
              width={200}
              height={80}
              priority
            />
          </div>

          {/* Redes Sociales */}
          <div className="flex flex-col items-center gap-6 md:items-start">
            <div className="flex items-center gap-2">
              <FaInstagram className="text-2xl text-white" />
              <span className="text-white">Instagram:</span>
              <a
                href="https://www.instagram.com/inf_cujae"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary transition-colors duration-300 hover:underline"
              >
                @inf_cujae
              </a>
            </div>

            <div className="flex items-center gap-2">
              <FaTelegram className="text-2xl text-white" />
              <span className="text-white">Telegram:</span>
              <a
                href="https://web.telegram.org/k/#@informaticaCujae"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary transition-colors duration-300 hover:underline"
              >
                Equipo de Desarrollo
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white border-opacity-20 pt-6 text-center text-sm text-white">
          © {new Date().getFullYear()} Informática CUJAE. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  );
};
