'use client';
import { useState } from 'react';
import { BurgerToggle } from '../buttons/BurgerToggle';
import { SlideBar } from '../dialogs/SlideBar';
import { LineButton } from '../buttons/LineButton';
import { AuthButton } from '../auth/AuthButton';

export const Navbar: React.FC = () => {
  const [openSlide, setOpenSlide] = useState(false);

  return (
    <>
      <nav className="flex w-full flex-col">
        {/** el pl-20 es para cubrir el espacio BurgerToggle */}
        <div className="relative flex w-full items-center justify-end bg-primary bg-opacity-95 p-6 pl-20 md:justify-between">
          <h1 className="hidden text-center text-2xl font-bold tracking-wide text-secondary md:block md:text-3xl lg:text-4xl">
            Facultad de Ingeniería Informática
          </h1>

          <div>
            <AuthButton />
          </div>
        </div>
      </nav>

      {
        // sidebar
      }
      <div className="fixed left-0 top-0 z-30 flex p-6 pt-8 text-slate-50">
        <div className="relative z-20">
          <BurgerToggle onClick={() => setOpenSlide((v) => !v)} />
        </div>
      </div>

      <div className="z-20 text-slate-50">
        <SlideBar open={openSlide}>
          <ul className="flex h-full w-full flex-col items-center space-y-4 bg-primary p-6 pt-20">
            <li>
              <LineButton to="/home">Página Principal</LineButton>
            </li>
            <li>
              <LineButton to="/blog">Blog</LineButton>
            </li>
            <li>
              <LineButton to="/events">Eventos</LineButton>
            </li>
            <li>
              <LineButton to="/history">¿Quienes somos?</LineButton>
            </li>
          </ul>
        </SlideBar>
      </div>
    </>
  );
};
