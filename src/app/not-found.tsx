import { Navbar } from '@/features/ui/layout/Navbar';
import Image from 'next/image';
import error404Img from '@/assets/error_404.png';
import { Button } from '@/features/ui/buttons/Button';
import { CookiesProvider } from 'next-client-cookies/server';

export default function NotFound() {
  return (
    <main className="flex w-full flex-col items-center">
      <CookiesProvider>
        <Navbar />
      </CookiesProvider>
      <Image
        className="m-3 w-full max-w-60"
        alt="404-error"
        src={error404Img}
      />

      <p className="p-6">Ups! El enlace que solicitas parece estar roto.</p>

      <Button to="/home">Ir al inicio</Button>
    </main>
  );
}
