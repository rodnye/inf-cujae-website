'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LineButton } from '@/components/buttons/LineButton';
import { useAdminStore } from '@/store/admin';
import { useCookies } from 'next-client-cookies';
import { Toggle } from '@/components/buttons/Toggle';
import { TextField } from '@/components/inputs/TextField';

export default function AdminLoginPage() {
  const router = useRouter();
  const cookies = useCookies();
  const apiKey = useAdminStore((s) => s.apiKey);
  const setApiKey = useAdminStore((s) => s.setApiKey);
  const [input, setInput] = useState(apiKey || '');
  const [remember, setRemember] = useState(!!apiKey);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey: input }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error de autenticación');
      }

      // si la autenticación es exitosa, guardar la API key si "remember" está activado
      if (remember) {
        setApiKey(input);
      }

      // settear cookie
      cookies.set('admin-session', data.sessionToken, { path: '/' });
      // redirigir a la página de admin
      router.push(data.redirect || '/admin');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'Ocurrió un error al iniciar sesión');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="m-3 text-2xl font-bold"> Login de administración </h1>
      <div className="flex flex-col rounded-md border-solid border-primary p-3">
        <div className="flex items-center justify-between">
          <p>Clave:</p>
          <TextField
            value={input}
            onChange={(value) => setInput(value)}
            className="p-2"
          />
        </div>

        <Toggle
          className="my-3"
          label="Recordar contraseña"
          checked={remember}
          onChange={(checked) => setRemember(checked)}
        />

        {error && <div className="mt-2 text-sm text-red-500">{error}</div>}

        <div className="mt-4 flex items-end">
          <LineButton onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Cargando...' : 'Acceder'}
          </LineButton>
        </div>
      </div>
    </div>
  );
}
