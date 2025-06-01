'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import avatarLogoMale from '@/assets/profile_pic.png'; // Importamos la imagen directamente
import avatarLogoFemale from '@/assets/profile_pic_female.png';

interface PersonalDataCardProps {
  user: {
    name: string;
    id: string;
    phone: string;
    province: string;
    address: string;
    gender?: string; // Añadido el campo género como opcional
  };
}

export function PersonalDataCard({ user }: PersonalDataCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Datos para mostrar en filas
  type UserKey = keyof typeof user;

  const dataRows: { label: string; key: UserKey }[] = [
    { label: 'Nombre:', key: 'name' },
    { label: 'ID:', key: 'id' },
    { label: 'Género:', key: 'gender' }, // Añadido género
    { label: 'Teléfono:', key: 'phone' },
    { label: 'Provincia:', key: 'province' },
    { label: 'Dirección:', key: 'address' },
  ];

  return (
    <div className="border-secondary/30 bg-secondary/10 hover:bg-secondary/20 animate-fadeIn flex h-full flex-col rounded-lg border text-on-body shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="border-secondary/20 flex items-center gap-4 border-b p-6">
        {/* Imagen de usuario - la misma para todos */}
        <div
          className={`border-secondary/30 overflow-hidden rounded-full border-2 transition-all duration-500 ${isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
        >
          <Image
            src={user.gender === 'M' ? avatarLogoMale : avatarLogoFemale}
            alt="Foto de perfil"
            width={64}
            height={64}
            className="h-16 w-16 object-cover"
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <h3 className="text-2xl font-semibold leading-none tracking-tight text-secondary">
            Datos Personales
          </h3>
          <p className="text-on-body/60 text-sm">Información de contacto</p>
        </div>
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
            <span className="text-sm font-semibold">
              {user[row.key] || 'No especificado'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
