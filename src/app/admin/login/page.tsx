'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAdminStore } from '@/store/admin';
import { useCookies } from 'next-client-cookies';
import { TextField } from '@/components/inputs/TextField';
import {
  FiShield,
  FiAlertCircle,
  FiLoader,
  FiEye,
  FiEyeOff,
} from 'react-icons/fi';

export default function AdminLoginPage() {
  const router = useRouter();
  const cookies = useCookies();
  const apiKey = useAdminStore((s) => s.apiKey);
  const setApiKey = useAdminStore((s) => s.setApiKey);
  const [input, setInput] = useState(apiKey || '');
  const [remember, setRemember] = useState(!!apiKey);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit();
    }
  };

  const toggleRemember = () => {
    if (!isLoading) {
      setRemember(!remember);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b1013] p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="relative mb-6 inline-block">
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-yellow-500/30 to-amber-500/30 blur-xl"></div>
            <div className="relative rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 p-4 shadow-2xl">
              <FiShield className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
            Panel de Administración
          </h1>
          <p className="mt-2 text-slate-400">
            Ingresa tu clave de acceso para continuar
          </p>
        </div>

        <div className="rounded-2xl border border-[#36454F]/50 bg-[#36454F]/20 p-8 backdrop-blur-xl">
          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 backdrop-blur-sm">
              <FiAlertCircle className="h-5 w-5 flex-shrink-0 text-red-400" />
              <span className="text-sm text-red-300">{error}</span>
            </div>
          )}

          <div className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="apiKey"
                className="block text-sm font-semibold text-slate-200"
              >
                Clave de API
                <span className="ml-1 text-amber-400">*</span>
              </label>
              <div className="relative" onKeyDown={handleKeyPress}>
                <TextField
                  type={showPassword ? 'text' : 'password'}
                  value={input}
                  onChange={(value) => {
                    setInput(value);
                    if (error) setError('');
                  }}
                  className="w-full rounded-xl border border-[#36454F] bg-[#36454F]/30 py-3 pl-12 pr-12 text-slate-100 backdrop-blur-sm transition-all duration-200 placeholder:text-slate-400 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/20"
                  placeholder="Ingresa tu clave de acceso..."
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 transition-colors hover:text-slate-300 focus:outline-none"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5" />
                  ) : (
                    <FiEye className="h-5 w-5" />
                  )}
                  <span className="sr-only">
                    {showPassword ? 'Ocultar' : 'Mostrar'} contraseña
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={toggleRemember}
                disabled={isLoading}
                className={`relative h-6 w-11 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 ${
                  remember
                    ? 'bg-gradient-to-r from-yellow-500 to-amber-500'
                    : 'bg-[#36454F]'
                } ${isLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
              >
                <div
                  className={`h-5 w-5 rounded-full bg-white shadow-lg transition-transform duration-200 ${
                    remember ? 'translate-x-5' : 'translate-x-0.5'
                  } mt-0.5`}
                />
                <span className="sr-only">
                  {remember ? 'Desactivar' : 'Activar'} recordar contraseña
                </span>
              </button>
              <label
                onClick={toggleRemember}
                className={`select-none text-sm text-slate-300 ${
                  isLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                }`}
              >
                Recordar contraseña
              </label>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading || !input.trim()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-yellow-400 hover:to-amber-400 hover:shadow-xl hover:shadow-yellow-500/25 active:scale-95 disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <FiLoader className="h-5 w-5 animate-spin" />
                  Verificando...
                </>
              ) : (
                <>
                  <FiShield className="h-5 w-5" />
                  Acceder al Panel
                </>
              )}
            </button>
          </div>

          <div className="mt-6 border-t border-[#36454F]/30 pt-6">
            <p className="text-center text-xs text-slate-500">
              Acceso restringido solo para administradores autorizados
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
