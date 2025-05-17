import Hero from '@/components/sections/Hero';
import { Navbar } from '@/components/sections/Navbar';

export default function HomePage() {
  return (
    <div className="overflox-x-hidden flex w-full flex-grow flex-col text-white">
      <Navbar />
      <Hero />
      <section></section>
    </div>
  );
}
