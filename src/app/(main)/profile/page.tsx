//import { UserProfileCard } from './UserProfileCard';
import { GradesHistoryCard } from '@/features/profile/ui/GradeHistoryCard';
import { AcademicDataCard } from '@/features/profile/ui/AcademicDataCard';
import { PersonalDataCard } from '@/features/profile/ui/PersonalDataCard';
import avatarLogo from '@/assets/profile_pic.png';

const mockUser = {
  name: 'Rodny Estrada',
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
        subject: 'Matemática Discreta',
        grade: 5,
      },
      {
        subject: 'Introducción a la Programación',
        grade: 2,
      },
      { subject: 'Calculo 1', grade: 3 },
      { subject: 'DIP', grade: 2 },
    ],
  },
  {
    year: '2do Año',
    subjects: [
      {
        subject: 'Estructuras de Datos',
        grade: 4,
      },
      { subject: 'Bases de Datos', grade: 2 },
      {
        subject: 'Matemática Computacional',
        grade: 5,
      },
      { subject: 'Historia', grade: 5 },
    ],
  },
  {
    year: '3er Año',
    subjects: [
      {
        subject: 'Programación Web',
        grade: 5,
      },
      {
        subject: 'Sistemas Operativos',
        grade: 3,
      },
      {
        subject: 'Redes de Computadoras',
        grade: 3,
      },
      {
        subject: 'Ingeniería de Software',
        grade: 4,
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
