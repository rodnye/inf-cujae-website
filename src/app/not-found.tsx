import { Navbar } from '@/components/sections/Navbar';
import Image from 'next/image';
import error404Img from '@/assets/error_404.png';
import { Button } from '@/components/buttons/Button';

export default function NotFound() {
  return (
    <main className="flex w-full flex-col items-center">
      <Navbar />

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
