'use client';

import { useState, memo } from 'react';
import { FaUser, FaChevronDown, FaSignal } from 'react-icons/fa6';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';

export const AuthButton: React.FC = memo(() => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Mostrar un indicador de carga mientras se verifica la autenticación
  if (isLoading) {
    return (
      <motion.div
        key="loading-auth"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="bg-secondary/30 flex items-center gap-2 rounded-lg px-4 py-2"
      >
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black/60"></div>
        <span className="text-secondary/50">Cargando...</span>
      </motion.div>
    );
  }

  // Mostrar el botón de inicio de sesión si el usuario no está autenticado
  if (!isAuthenticated) {
    return (
      <motion.div
        key="login-button"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <Link
          href="/login"
          className="hover:bg-secondary/90 flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 font-medium text-black shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105"
        >
          <FaUser className="text-sm" />
          <span>Iniciar Sesión</span>
        </Link>
      </motion.div>
    );
  }

  // Mostrar el botón con el nombre del usuario si está autenticado
  return (
    <motion.div
      key={`user-${user?.id}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="hover:bg-secondary/90 flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 font-medium text-black shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105"
      >
        <FaUser className="text-sm" />
        <span>Hola, {user?.name}</span>
        <FaChevronDown
          className={`text-xs transition-transform duration-200 ${
            isDropdownOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full z-10 mt-2 w-48 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
          >
            <div className="border-b bg-gray-50 p-3">
              <p className="font-medium text-gray-900">{user?.name}</p>
              {user?.email && (
                <p className="text-sm text-gray-500">{user.email}</p>
              )}
              {user?.cid && (
                <p className="text-sm text-gray-500">CID: {user.cid}</p>
              )}
            </div>

            <div className="py-1">
              <Link
                href="/grades"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                <FaUser className="text-xs" />
                Mi Perfil
              </Link>

              <button
                onClick={() => {
                  logout();
                  setIsDropdownOpen(false);
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
              >
                <FaSignal className="text-xs" />
                Cerrar Sesión
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </motion.div>
  );
});

AuthButton.displayName = 'AuthButton';
