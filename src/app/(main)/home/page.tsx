import Hero from '@/components/sections/Hero';
import { Navbar } from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';

export default function HomePage() {
  return (
    <div className="overflox-x-hidden flex w-full flex-grow flex-col text-white">
      <Navbar />
      <Hero />
      <Footer />
      <section></section>
    </div>
  );
}
