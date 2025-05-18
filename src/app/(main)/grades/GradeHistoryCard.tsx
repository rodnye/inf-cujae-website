'use client';

import { useEffect, useState } from 'react';

interface GradesHistoryCardProps {
  gradesByYear: {
    year: string;
    subjects: {
      asignatura: string;
      nota: number;
    }[];
  }[];
}

export function GradesHistoryCard({ gradesByYear }: GradesHistoryCardProps) {
  const [selectedYear, setSelectedYear] = useState<string>(
    gradesByYear[0]?.year ?? '',
  );
  const [isVisible, setIsVisible] = useState(false);
  const [tableVisible, setTableVisible] = useState(false);

  const selectedBlock = gradesByYear.find(
    (block) => block.year === selectedYear,
  );

  useEffect(() => {
    // Activar visibilidad del componente
    setIsVisible(true);

    // Pequeño retraso para la tabla
    const timer = setTimeout(() => {
      setTableVisible(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  // Este efecto se activa cuando cambia el año seleccionado
  useEffect(() => {
    setTableVisible(false);

    const timer = setTimeout(() => {
      setTableVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, [selectedYear]);

  return (
    <div className="border-secondary/30 bg-secondary/10 hover:bg-secondary/20 animate-fadeIn rounded-lg border text-on-body shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="border-secondary/20 flex flex-col space-y-1.5 border-b p-6">
        <h3
          className={`text-2xl font-semibold leading-none tracking-tight text-secondary transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
        >
          Historial de Calificaciones
        </h3>
        <p
          className={`text-on-body/60 text-sm transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          style={{ transitionDelay: '100ms' }}
        >
          Calificaciones obtenidas en las asignaturas por año académico
        </p>
      </div>

      {/* Tabs - con animación de entrada */}
      <div
        className={`flex gap-2 px-6 pt-2 transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
        style={{ transitionDelay: '200ms' }}
      >
        {gradesByYear.map((yearBlock, index) => (
          <button
            key={yearBlock.year}
            className={`rounded-t-lg border-b-2 px-4 py-2 font-semibold transition-all duration-300 ${
              selectedYear === yearBlock.year
                ? 'bg-body/10 border-primary text-secondary'
                : 'hover:bg-secondary/20 border-transparent text-on-body'
            }`}
            onClick={() => setSelectedYear(yearBlock.year)}
            style={{ transitionDelay: `${200 + index * 100}ms` }}
          >
            {yearBlock.year}
          </button>
        ))}
      </div>

      {/* Selected year table - con animación entre cambios */}
      <div className="p-6 pt-0">
        {selectedBlock && (
          <div
            className={`overflow-x-auto transition-all duration-500 ${tableVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          >
            <table className="divide-secondary/20 w-full divide-y">
              <thead>
                <tr className="border-b">
                  <th className="px-2 py-3 text-left font-medium">
                    Asignatura
                  </th>
                  <th className="w-32 px-2 py-3 text-center font-medium">
                    Calificación
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedBlock.subjects.map((subject, idx) => (
                  <tr
                    key={subject.asignatura}
                    className={`hover:bg-secondary/10 border-b transition-all duration-300 last:border-0 ${tableVisible ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                    style={{ transitionDelay: `${300 + idx * 100}ms` }}
                  >
                    <td className="px-2 py-3">{subject.asignatura}</td>
                    <td className="w-32 px-2 py-3 text-center">
                      <span
                        className={`inline-flex items-center justify-center font-medium ${
                          subject.nota >= 4
                            ? 'text-green-600'
                            : subject.nota >= 3
                              ? 'text-blue-600'
                              : 'text-yellow-600'
                        }`}
                      >
                        {subject.nota}
                        {subject.nota >= 4 && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="ml-1 h-4 w-4 text-green-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
