import { Footer } from '@/features/ui/layout/Footer';
import { Navbar } from '@/features/ui/layout/Navbar';
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
