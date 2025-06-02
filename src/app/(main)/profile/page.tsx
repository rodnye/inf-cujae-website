//import { UserProfileCard } from './UserProfileCard';
import { GradesHistoryCard } from './GradeHistoryCard';
import avatarLogo from '@/assets/profile_pic.png';
import { AcademicDataCard } from './AcademicDataCard';
import { PersonalDataCard } from './PersonalDataCard';

const mockUser = {
  name: 'Juan Pérez',
  avatar: avatarLogo.src,
  carrera: 'Ingeniería Informática',
  year: '3er Año',
  email: 'juan.perez@cujae.edu.cu',
  id: '020426783459',
  gender: 'M',
  promedio: 3.8,
  phone: '123456789',
  province: 'Pinar del Río',
  address: 'Calle Principal, Casa 123',
  listNumber: 20,
  group: '1-3',
  studentType: 'Regular',
  courseType: 'Presencial',
};

const mockGradesByYear = [
  {
    year: '1er Año',
    subjects: [
      {
        asignatura: 'Matemática Discreta',
        nota: 5,
      },
      {
        asignatura: 'Introducción a la Programación',
        nota: 2,
      },
      { asignatura: 'Calculo 1', nota: 3 },
      { asignatura: 'DIP', nota: 2 },
    ],
  },
  {
    year: '2do Año',
    subjects: [
      {
        asignatura: 'Estructuras de Datos',
        nota: 4,
      },
      { asignatura: 'Bases de Datos', nota: 2 },
      {
        asignatura: 'Matemática Computacional',
        nota: 5,
      },
      { asignatura: 'Historia', nota: 5 },
    ],
  },
  {
    year: '3er Año',
    subjects: [
      {
        asignatura: 'Programación Web',
        nota: 5,
      },
      {
        asignatura: 'Sistemas Operativos',
        nota: 3,
      },
      {
        asignatura: 'Redes de Computadoras',
        nota: 3,
      },
      {
        asignatura: 'Ingeniería de Software',
        nota: 4,
      },
    ],
  },
  {
    year: '4to Año',
    subjects: [
      {
        asignatura: '123231',
        nota: 5,
      },
      {
        asignatura: 'Tesiiiii',
        nota: 3,
      },
      {
        asignatura: 'El chicleeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        nota: 3,
      },
      {
        asignatura: 'Ingeniería de Software',
        nota: 4,
      },
    ],
  },
];

export default function GradesPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-body to-body-end px-4 py-12 text-on-body">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-10 text-center text-4xl font-extrabold text-secondary drop-shadow-md">
          Perfil Académico
        </h1>

        <div className="space-y-8">
          {/* Fila superior: tarjetas de perfil personal y académico */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <PersonalDataCard user={mockUser} />
            <AcademicDataCard user={mockUser} />
          </div>

          {/* Fila inferior: historial de calificaciones a pantalla completa */}
          <div>
            <GradesHistoryCard gradesByYear={mockGradesByYear} />
          </div>
        </div>
      </div>
    </div>
  );
}
