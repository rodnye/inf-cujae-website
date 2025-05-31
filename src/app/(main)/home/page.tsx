'use client';

import { ScrollButton } from '@/components/buttons/Button';
import { Navbar } from '@/components/sections/Navbar';
import { FaBook, FaToolbox, FaTrophy, FaCalendar } from 'react-icons/fa6';
import { Footer } from '@/components/sections/Footer';
import { BlogGrid } from '@/components/sections/BlogGrid';
import { HeroCard } from './HeroCard';
import { mockBlogEntries } from './_mockBlogEntries';
import { useEffect, useState } from 'react';
import { motion, useScroll, useInView } from 'framer-motion';
import { useRef } from 'react';

import blogImg from '@/assets/blog-whale-01.png';
import eventsImg from '@/assets/events-whale.png';
import gradesImg from '@/assets/grades-whale-01.png';
import matsImg from '@/assets/materials-whale.png';

export default function HomePage() {
  // Para animaciones de scroll
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  // Referencias para elementos que usarán inView
  const recentPostsRef = useRef(null);
  const sectionsRef = useRef(null);
  const isRecentPostsInView = useInView(recentPostsRef, {
    once: true,
    margin: '-100px',
  });
  const isSectionsInView = useInView(sectionsRef, {
    once: true,
    margin: '-100px',
  });

  // Detectar scroll
  useEffect(() => {
    return scrollY.onChange((latest) => {
      if (latest > 100) {
        setScrolled(true);
      }
    });
  }, [scrollY]);

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden text-on-body">
      <Navbar />

      <div className="w-full flex-grow bg-gradient-to-b from-body to-[var(--color-body-end)]">
        {/* Welcome Section */}
        <section className="mx-auto mb-16 mt-36 max-w-4xl px-4">
          <div className="flex flex-col items-center justify-center p-6 pl-10 lg:p-0 lg:text-center">
            <motion.h1
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-4 text-6xl font-extrabold drop-shadow-md lg:text-7xl"
            >
              Ingeniería <span className="text-secondary">Informática</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mb-2 mt-5 max-w-2xl text-lg md:text-xl"
            >
              Un lugar donde todos aquellos que soñaban con crear aplicaciones,
              ser hackers, dar vida a los mas bellos juegos y ser los mejores
              programadores, se reunen para esta vez cumplir sus sueños.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-5 max-w-2xl text-lg md:text-xl"
            >
              "Si puedes imaginarlo, puedes programarlo" -
              <strong> Alejandro Taboada</strong>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-8 h-1 w-24 rounded bg-gradient-to-r from-[#FFEA00]/60 to-[#FFEA00]/80"
            ></motion.div>
          </div>
        </section>

        {/* Navigation Section */}
        <section className="mx-auto mb-16 flex max-w-sm flex-col flex-wrap items-stretch justify-center gap-5 px-4 lg:max-w-full lg:flex-row lg:items-center">
          {[
            {
              icon: <FaToolbox />,
              text: 'Materiales',
              scrollTo: 'mats',
              delay: 0.8,
            },
            { icon: <FaBook />, text: 'Blog', scrollTo: 'blog', delay: 0.9 },
            {
              icon: <FaCalendar />,
              text: 'Eventos',
              scrollTo: 'events',
              delay: 1.0,
            },
            {
              icon: <FaTrophy />,
              text: 'Clasificaciones',
              scrollTo: 'grades',
              delay: 1.1,
            },
          ].map((btn) => (
            <motion.div
              key={btn.scrollTo}
              className="flex flex-col items-stretch"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: btn.delay }}
            >
              <ScrollButton icon={btn.icon} scrollTo={btn.scrollTo}>
                {btn.text}
              </ScrollButton>
            </motion.div>
          ))}
        </section>

        {/* Publicaciones recientes - Con animación al scroll */}
        <motion.section
          ref={recentPostsRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isRecentPostsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="mx-auto mb-16 max-w-6xl px-4"
        >
          <h2 className="mb-6 text-center text-3xl font-bold text-[var(--color-secondary)]">
            Publicaciones más recientes
          </h2>
          <BlogGrid entries={mockBlogEntries} />
        </motion.section>

        {/* Content Section - Con animación al scroll */}
        <section ref={sectionsRef} className="mx-auto max-w-6xl px-4 py-4">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isSectionsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-10 text-center text-3xl font-bold text-[var(--color-secondary)]"
          >
            Explora Nuestras Secciones
          </motion.h2>

          <div className="flex flex-col gap-8 p-4">
            {[
              {
                id: 'mats',
                title: 'Materiales',
                image: matsImg.src,
                description:
                  'Coleccion de materiales de estudio para todos los cursos informaticos. ' +
                  'Te lleva mal la Uni? Peor te llevara la busqueda de chamba, asi que aprovecha estos materiales ' +
                  'que hemos preparado para ti y asi se mejor programador cada dia.',
                url: 'mats',
              },
              {
                id: 'blog',
                title: 'Blog',
                image: blogImg.src,
                description:
                  'Blog para compartir informacion entre estudiantes y profesores',
                url: 'blog',
              },
              {
                id: 'events',
                title: 'Eventos',
                image: eventsImg.src,
                description:
                  'Calendario de eventos, conferencias y actividades importantes',
                url: 'events',
              },
              {
                id: 'grades',
                title: 'Calificaciones',
                image: gradesImg.src,
                description:
                  'Revisa y manten una revision de tus calificaciones y tareas pendientes',
                url: 'grades',
              },
            ].map((card, index) => (
              <motion.div
                key={card.id}
                id={card.id}
                initial={{ opacity: 0, x: -40 }}
                animate={isSectionsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1, delay: 0.2 * index }}
              >
                <HeroCard
                  title={card.title}
                  image={card.image}
                  description={card.description}
                  url={card.url}
                />
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
