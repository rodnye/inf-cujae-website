import { CookiesProvider } from 'next-client-cookies/server';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <CookiesProvider>{children}</CookiesProvider>;
}
