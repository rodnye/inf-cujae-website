'use client';
import { useState, useEffect } from 'react';
import { useUserStore } from '@/store/user';
import { User } from '@/types/user';
import { useCookies } from 'next-client-cookies';

export const useAuth = () => {
  const cookies = useCookies();
  const sessionKey = useUserStore((s) => s.sessionKey);
  const setSessionKey = useUserStore((s) => s._setSessionKey);

  const user = useUserStore((s) => s.userData);
  const setUser = useUserStore((s) => s._setUserData);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading || !sessionKey || user) return;

    const checkAuth = async () => {
      setIsLoading(true);

      try {
        cookies.set('user-token', sessionKey);
        const response = await fetch('/api/profile');

        if (!response.ok) throw new Error('Not ok');

        const profileData = await response.json();
        const userInfo = profileData.user as User;

        if (!userInfo) throw new Error('No data');
        setUser(userInfo);
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
        setUser(null);
        setSessionKey(null);
        cookies.remove('user-token');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [sessionKey]);

  const logout = async () => {
    setIsLoading(true);
    try {
      setUser(null);
      setSessionKey(null);
      cookies.remove('user-token');
      setIsLoading(false);
    } catch {
      console.error('Error al cerrar sesión');
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    logout,
  };
};
