import { LineButton } from '@/components/buttons/LineButton';
import { Navbar } from '@/components/sections/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import error404Img from '@/assets/error_404.png';

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

      <Link href="/home">
        <LineButton>Ir al inicio</LineButton>
      </Link>
    </main>
  );
}
