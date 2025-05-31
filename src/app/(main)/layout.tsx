import { Footer } from '@/components/sections/Footer';
import { Navbar } from '@/components/sections/Navbar';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden text-on-body">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
