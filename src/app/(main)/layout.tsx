import { Footer } from '@/components/sections/Footer';
import { Navbar } from '@/components/sections/Navbar';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-grow pb-16">{children}</div>
      <Footer />
    </div>
  );
}
