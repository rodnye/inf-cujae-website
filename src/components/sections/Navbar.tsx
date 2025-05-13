'use client';
import { useState } from 'react';
import { BurgerToggle } from '../buttons/BurgerToggle';
import { SlideBar } from '../dialogs/SlideBar';
import { LineButton } from '../buttons/LineButton';

export const Navbar: React.FC = () => {
  const [openSlide, setOpenSlide] = useState(false);
  return (
    <>
      <nav className="flex flex-col">
        {/** el pl-20 es para cubrir el espacio BurgerToggle */}
        <div className="relative w-full bg-primary bg-opacity-95 p-6 pl-20">
          s
        </div>
      </nav>

      {
        // sidebar
      }
      <div className="fixed left-0 top-0 z-30 flex p-6 text-slate-50">
        <div className="relative z-20">
          <BurgerToggle onClick={() => setOpenSlide((v) => !v)} />
        </div>
      </div>

      <div className="absolute left-0 top-0 z-10 h-full w-full">
        <SlideBar open={openSlide}>
          <ul className="flex h-full w-full flex-col items-center space-y-4 bg-primary p-6 pt-20">
            <li>
              <LineButton>Página Principal</LineButton>
            </li>
            <li>
              <LineButton>Artículos</LineButton>
            </li>
            <li>
              <LineButton>Eventos</LineButton>
            </li>
            <li>
              <LineButton>¿Quienes somos?</LineButton>
            </li>
          </ul>
        </SlideBar>
      </div>
    </>
  );
};
