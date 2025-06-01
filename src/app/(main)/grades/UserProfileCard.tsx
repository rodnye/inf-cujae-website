'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface UserProfileCardProps {
  user: {
    name: string;
    avatar: string;
    carrera: string;
    year: string;
    email: string;
    id: string;
    promedio: number;
  };
}

export function UserProfileCard({
  user,
}: {
  user: UserProfileCardProps['user'];
}) {
  // Estados para animaciones
  const [isVisible, setIsVisible] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Activar visibilidad tras montar el componente
    setIsVisible(true);

    // Animar la barra de progreso con un pequeño retraso
    const timer = setTimeout(() => {
      setProgressWidth((user.promedio / 5) * 100);
    }, 800);

    return () => clearTimeout(timer);
  }, [user.promedio]);

  return (
    <div className="border-secondary/30 bg-secondary/10 hover:bg-secondary/20 animate-fadeIn flex h-full flex-col rounded-lg border text-on-body shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="border-secondary/20 flex flex-col space-y-1.5 border-b p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight text-secondary">
          Datos Personales
        </h3>
        <p className="text-on-body/60 text-sm">
          Información personal del estudiante
        </p>
      </div>

      <div className="flex flex-col items-center space-y-4 p-8">
        <div
          className={`overflow-hidden rounded-full transition-all duration-700 ${isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
        >
          <Image
            src={user.avatar}
            alt={user.name}
            width={100}
            height={100}
            onLoad={() => setImageLoaded(true)}
            className={`rounded-full border-4 border-secondary bg-white shadow-md transition-all duration-500 ${imageLoaded ? 'scale-100' : 'scale-95'}`}
          />
        </div>
        <div className="text-center">
          <h3
            className={`text-2xl font-semibold leading-none tracking-tight text-secondary transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          >
            {user.name}
          </h3>

          <p
            className={`text-on-body/60 text-sm transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            style={{ transitionDelay: '200ms' }}
          >
            ID: {user.id}
          </p>
          <p
            className={`text-on-body/60 text-sm transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            style={{ transitionDelay: '300ms' }}
          >
            {user.carrera}
          </p>
          <p
            className={`text-on-body/60 text-sm transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            style={{ transitionDelay: '400ms' }}
          >
            {user.year}
          </p>
          <p
            className={`text-on-body/60 text-sm transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            style={{ transitionDelay: '500ms' }}
          >
            {user.email}
          </p>
        </div>
      </div>
      <div className="space-y-6 px-8 pb-8">
        {/* Promedio */}
        <div
          className={`transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm font-medium">Promedio General</span>
            <div className="flex items-center gap-1 text-sm font-bold text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="animate-bounce text-green-500"
              >
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                <polyline points="16 7 22 7 22 13"></polyline>
              </svg>
              <span className="text-[--color-on-body]">{user.promedio}/5</span>
            </div>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-secondary transition-all duration-1000"
              style={{ width: `${progressWidth}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
