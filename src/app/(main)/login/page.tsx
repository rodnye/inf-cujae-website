'use client';

import { useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Lottie from 'lottie-react';
import orcaMascotAnimation from '@/assets/orca_mascot.json';
import { TextField } from '@/features/ui/inputs/TextField';
import { Button } from '@/features/ui/buttons/Button';
import { useUserStore } from '@/store/user';
import { useAuth } from '@/features/login/use-auth';

export default function LoginPage() {
  const [cid, setCid] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const userData = useAuth().user;
  const setSessionKey = useUserStore((s) => s._setSessionKey);
  const router = useRouter();

  useLayoutEffect(() => {
    if (userData) return router.push('/home');
  }, [userData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cid, pass }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      setSessionKey(data.session);
      router.push(data.redirect);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-body to-body-end p-4">
      <div className="w-full max-w-md">
        <div className="border-secondary/30 bg-secondary/10 rounded-lg border p-8 shadow-lg backdrop-blur-md">
          {/* Animación Lottie */}
          <div className="mb-6 flex justify-center">
            <Lottie
              animationData={orcaMascotAnimation}
              loop={true}
              style={{ height: 200, width: 200 }}
            />
          </div>

          <h1 className="mb-6 text-center text-3xl font-bold text-secondary">
            Inicio de Sesión
          </h1>

          {error && (
            <div className="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <TextField
              placeholder="Ej: 00112233445"
              value={cid}
              name="cid"
              onChange={setCid}
              required
              minLength={11}
              className="w-full"
            />

            <TextField
              placeholder="Su contraseña"
              value={pass}
              name="password"
              onChange={setPass}
              type="password"
              required
              minLength={6}
              className="w-full"
            />

            <div className="flex w-full justify-center">
              <Button disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    <span>Iniciando sesión...</span>
                  </div>
                ) : (
                  'Iniciar Sesión'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
