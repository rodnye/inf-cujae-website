'use client';

import { useEffect, useState } from 'react';

interface AcademicDataCardProps {
  user: {
    carrera: string;
    year: string;
    promedio: number;
    listNumber: number;
    group: string;
    studentType: string;
    courseType: string;
  };
}

export function AcademicDataCard({ user }: AcademicDataCardProps) {
  // Para animar la barra de progreso
  const [progressWidth, setProgressWidth] = useState(0);

  // Para la aparición secuencial de los elementos
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Activar la visibilidad después de montar
    setIsVisible(true);

    // Animar la barra de progreso
    const timer = setTimeout(() => {
      setProgressWidth((user.promedio / 5) * 100);
    }, 500);

    return () => clearTimeout(timer);
  }, [user.promedio]);

  return (
    <div className="border-secondary/30 bg-secondary/10 hover:bg-secondary/20 animate-fadeIn flex h-full flex-col rounded-lg border text-on-body shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="border-secondary/20 flex flex-col space-y-1.5 border-b p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight text-secondary">
          Datos Académicos
        </h3>
        <p className="text-on-body/60 text-sm">
          Información docente del estudiante
        </p>
      </div>

      <div className="space-y-4 p-6">
        {dataRows.map((row, index) => (
          <div
            key={row.label}
            className={`border-secondary/10 hover:bg-secondary/10 flex justify-between rounded border-b px-2 py-2 transition-all ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <span className="text-on-body/70 text-sm font-medium">
              {row.label}
            </span>
            <span className="text-sm font-semibold">{user[row.key]}</span>
          </div>
        ))}

        {/* Promedio */}
        <div
          className={`mt-6 transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium">Promedio General</span>
            <div className="flex items-center gap-1 text-sm font-bold text-on-body">
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
              <span className="transition-all duration-500">
                {user.promedio}/5
              </span>
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

// Datos organizados para facilitar el mapeo
const dataRows: Array<{
  label: string;
  key: keyof AcademicDataCardProps['user'];
}> = [
  { label: 'Carrera:', key: 'carrera' },
  { label: 'Año Académico:', key: 'year' },
  { label: 'Número de Lista:', key: 'listNumber' },
  { label: 'Grupo:', key: 'group' },
  { label: 'Tipo de Estudiante:', key: 'studentType' },
  { label: 'Tipo de Curso:', key: 'courseType' },
];
