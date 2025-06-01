import { Footer } from '@/components/sections/Footer';
import { Navbar } from '@/components/sections/Navbar';
import { CookiesProvider } from 'next-client-cookies/server';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <CookiesProvider>
        <Navbar />
        <div className="flex-grow pb-16">{children}</div>
        <Footer />
      </CookiesProvider>
    </div>
  );
}
