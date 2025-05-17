import { verifyAdminSession } from '@/services/login';
import { getCookies } from 'next-client-cookies/server';
import { redirect } from 'next/navigation';

/**
 * Higher Order Component para verificar la sesión de administrador
 */
export const withAdminSession = (Page: () => React.JSX.Element) => {
  return async () => {
    const cookiesStore = await getCookies();
    const adminCookie = cookiesStore.get('admin-session');

    if (!adminCookie) {
      return redirect('/admin/login');
    }

    try {
      const isValid = await verifyAdminSession(adminCookie);
      if (!isValid) {
        throw new Error();
      }
    } catch (error) {
      // hubo un error durante la validación
      return redirect('/admin/login');
    }

    return <Page />;
  };
};
