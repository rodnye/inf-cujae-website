import { Button } from '@/components/buttons/Button';
import { Navbar } from '@/components/sections/Navbar';
import { FaBook, FaToolbox, FaTrophy, FaCalendar } from 'react-icons/fa6';
import { Footer } from '@/components/sections/Footer';
import { BlogGrid } from '@/components/sections/BlogGrid';
import { HeroCard } from './HeroCard';
import { mockBlogEntries } from './_mockBlogEntries';

export default function HomePage() {
  return (
    <div className="overflox-x-hidden flex w-full flex-grow flex-col text-on-body">
      <Navbar />

      <div className="min-h-screen w-full bg-gradient-to-b from-body to-[var(--color-body-end)]">
        {/* Welcome Section */}
        <section className="mx-auto mb-16 mt-36 max-w-4xl px-4">
          <div className="flex flex-col items-center justify-center p-6 pl-10 lg:p-0 lg:text-center">
            <h1 className="mb-4 text-6xl font-extrabold drop-shadow-md lg:text-7xl">
              Ingeniería <span className="text-secondary">Informática</span>
            </h1>
            <p className="mb-2 mt-5 max-w-2xl text-lg md:text-xl">
              Un lugar donde todos aquellos que soñaban con crear aplicaciones,
              ser hackers, dar vida a los mas bellos juegos y ser los mejores
              programadores, se reunen para esta vez cumplir sus sueños.
            </p>
            <p className="mt-5 max-w-2xl text-lg md:text-xl">
              "Si puedes imaginarlo, puedes programarlo" -
              <strong> Alejandro Taboada</strong>
            </p>
            <div className="mt-8 h-1 w-24 rounded bg-gradient-to-r from-[#FFEA00]/60 to-[#FFEA00]/80"></div>
          </div>
        </section>

        {/* Navigation Section */}
        <section className="mx-auto mb-16 flex max-w-sm flex-col flex-wrap items-stretch justify-center gap-5 px-4 lg:max-w-full lg:flex-row lg:items-center">
          <Button icon={<FaToolbox />} to="/mats">
            Materiales
          </Button>
          <Button icon={<FaBook />} to="/blog">
            Blog
          </Button>
          <Button icon={<FaCalendar />} to="/events">
            Eventos
          </Button>
          <Button icon={<FaTrophy />} to="/grades">
            Clasificaciones
          </Button>
        </section>

        {/* Publicaciones recientes */}
        <section className="mx-auto mb-16 max-w-6xl px-4">
          <h2 className="mb-6 text-center text-3xl font-bold text-[#FFEA00]">
            Publicaciones mas recientes
          </h2>
          <BlogGrid entries={mockBlogEntries} />
        </section>

        {/* Content Section - Card layout for sections */}
        <section className="mx-auto max-w-6xl px-4 py-4">
          <h2 className="mb-10 text-center text-3xl font-bold text-[#FFEA00]">
            Explora Nuestras Secciones
          </h2>
          <div className="flex flex-col gap-8">
            <HeroCard
              title="Materiales"
              image="/images/materials.jpg"
              description={
                'Coleccion de materiales de estudio para todos los cursos informaticos.' +
                'Te lleva mal la Uni? Peor te llevara la busqueda de chamba, asi que aprovecha estos materiales' +
                'que hemos preparado para ti y asi se mejor programador cada dia.'
              }
            />
            <HeroCard
              title="Blog"
              image="/images/blog.jpg"
              description="Blog para compartir informacion entre estudiantes y profesores"
            />
            <HeroCard
              title="Eventos"
              image="/images/events.jpg"
              description="Calendario de eventos, conferencias y actividades importantes"
            />
            <HeroCard
              title="Calificaciones"
              image="/images/calificaciones.jpg"
              description="Revisa y manten una revision de tus calificaciones y tareas pendientes"
            />
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
