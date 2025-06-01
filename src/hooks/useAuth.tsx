'use client';

import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email?: string;
  cid?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/profile', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const profileData = await response.json();
          const userInfo = profileData.user;

          if (userInfo) {
            const firstName = await userInfo.name.split(' ')[0];

            setUser({
              id: userInfo.id,
              name: firstName,
              email: userInfo.email,
              cid: userInfo.cid,
            });
            setIsAuthenticated(true);
          } else {
            setUser(null);
            setIsAuthenticated(false);
          }
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = async () => {
    setIsLoading(true);
    try {
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
    } catch {
      console.error('Error al cerrar sesión');
      setIsLoading(false);
    }
  };

  return {
    user,
    isAuthenticated: isAuthenticated && user !== null, // Solo true si user está cargado
    isLoading,
    logout,
  };
};
