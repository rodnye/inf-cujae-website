import SectionButton from '../buttons/SectionButton';
import BlogEntry from './BlogEntry';
import BlogGrid from './BlogGrid';
import HeroSection from './HeroSection';

const blogEntries = [
  {
    img: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Cujae_Graduation_2007_Karl_Marx_Teater_-_panoramio.jpg',
    title: 'Aniversario de la jornada REINA',
    content:
      'Esta semana celebramos el aniversario de la jornada REINA, donde se celebran conferencias y eventos para todos los estudiantes...',
  },
  {
    img: 'https://www.uade.edu.ar/media/ivpjofpt/ingenier%C3%ADa-infom%C3%A1tica-uade.jpg?crop=0.0000000000000002855104566728,0.20467154528675619,0,0.33743371787113863&cropmode=percentage&width=1900&height=580&rnd=133120411993130000',
    title: 'Nuevos cursos disponibles',
    content: 'Hemos añadido nuevos materiales y cursos para el semestre...',
  },
  {
    img: 'https://cdn.corporatefinanceinstitute.com/assets/cloud-services-1024x401.jpeg',
    title: 'Hackathon de primavera',
    content:
      'Participa en nuestro hackathon anual con premios y reconocimientos...',
  },
  // Add more entries as needed
];

export default function Hero() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0b1013] to-[#0c1922] py-16">
      {/* Welcome Section - Full width header */}
      <section className="mx-auto mb-16 mt-36 max-w-4xl px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="mb-4 text-6xl font-extrabold text-[#ffffff] drop-shadow-md md:text-7xl">
            Ingeniería <span className="text-[#ffea00]">Informática</span>
          </h1>
          <p className="mb-2 mt-5 max-w-2xl text-lg text-white/90 md:text-xl">
            Un lugar donde todos aquellos que soñaban con crear aplicaciones,
            ser hackers, dar vida a los mas bellos juegos y ser los mejores
            programadores, se reunen para esta vez cumplir sus sueños.
          </p>
          <p className="mt-5 max-w-2xl text-lg text-white/90 md:text-xl">
            "Si puedes imaginarlo, puedes programarlo" -{' '}
            <strong>Alejandro Taboada</strong>
          </p>
          <div className="mt-8 h-1 w-24 rounded bg-gradient-to-r from-[#FFEA00]/60 to-[#FFEA00]/80"></div>
        </div>
      </section>
      {/* Navigation Section - Centered buttons */}
      <section className="mx-auto mb-16 flex flex-wrap items-center justify-center gap-5 px-4">
        <SectionButton title={'Materiales'} section={'mats'} />
        <SectionButton title={'Blog'} section={'blog'} />
        <SectionButton title={'Eventos'} section={'events'} />
        <SectionButton title={'Calificaciones'} section={'grades'} />
      </section>
      <section className="mx-auto mb-16 max-w-6xl px-4">
        <h2 className="mb-6 text-center text-3xl font-bold text-[#FFEA00]">
          Publicaciones mas recientes
        </h2>
        <BlogGrid entries={blogEntries} />
      </section>
      {/* Content Section - Card layout for sections */}
      <section className="mx-auto max-w-6xl px-4 py-4">
        <h2 className="mb-10 text-center text-3xl font-bold text-[#FFEA00]">
          Explora Nuestras Secciones
        </h2>
        <div className="flex flex-col gap-8">
          <HeroSection
            title={'Materiales'}
            image={'/images/materials.jpg'}
            description={
              'Coleccion de materiales de estudio para todos los cursos informaticos.' +
              'Te lleva mal la Uni? Peor te llevara la busqueda de chamba, asi que aprovecha estos materiales' +
              'que hemos preparado para ti y asi se mejor programador cada dia.'
            }
          />
          <HeroSection
            title={'Blog'}
            image={'/images/blog.jpg'}
            description={
              'Blog para compartir informacion entre estudiantes y profesores'
            }
          />
          <HeroSection
            title={'Eventos'}
            image={'/images/events.jpg'}
            description={
              'Calendario de eventos, conferencias y actividades importantes'
            }
          />
          <HeroSection
            title={'Calificaciones'}
            image={'/images/calificaciones.jpg'}
            description={
              'Revisa y manten una revision de tus calificaciones y tareas pendientes'
            }
          />
        </div>
      </section>
    </div>
  );
}
