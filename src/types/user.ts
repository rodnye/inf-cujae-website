export type User = {
  cid: string;
  name: string;
  year: number;
  email?: string;
  address?: string;
  phone?: string;
  // tipo de curso
  courseType?: string;
  // tipo de usuario: alumno, profesor, admin
  userType?: 'student' | 'teacher' | 'admin';
  // historial de calificaciones por año
  gradesHistory?: {
    [year: string]: {
      subject: string;
      grade: number;
    }[];
  };
};

export type FullUser = User & {
  pass: string;
};
