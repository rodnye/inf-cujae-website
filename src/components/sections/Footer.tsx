import Image from 'next/image';
import logoInforImg from '@/assets/logo_infor.png';
import instagramIcon from '@/assets/instagram-icon.svg';
import telegramIcon from '@/assets/telegram-icon.svg';

export default function Footer() {
  return (
    <footer className="relative mt-auto w-full bg-primary bg-opacity-95 px-5 py-60 sm:px-6 sm:py-12">
      <div className="mx-auto w-full p-5 md:max-w-screen-2xl">
        <div className="md:flex md:justify-between">
          <div className="-translate-y-1/6 left-100 absolute top-2 transform">
            <Image
              className="w-20 rounded-lg transition-all duration-300 hover:scale-105"
              alt="logoInfor"
              src={logoInforImg}
              width={300}
              height={1000}
            />
          </div>

          <div className="left-100 top-37 absolute translate-y-8 transform">
            <Image
              className="w-8 transition-all duration-300 hover:scale-105"
              alt="instagramIcon"
              src={instagramIcon}
            />
          </div>

          <div className="left-100 top-100 absolute translate-y-20 transform">
            <Image
              className="w-8 transition-all duration-300 hover:scale-105"
              alt="telegramIcon"
              src={telegramIcon}
            />
          </div>

          {/* Contenido principal con padding superior para evitar solapamiento */}
          <div className="w-full pt-16 md:pt-20">
            {' '}
            <div className="flex flex-col justify-between gap-8 text-white sm:gap-6 md:flex-row md:flex-wrap md:gap-10"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
