export type GradeHistory = {
  year: string;
  subjects: {
    subject: string;
    grade: number;
  }[];
};

export type User = {
  cid: string;
  name: string;
  year: number;
  email?: string;
  address?: string;
  phone?: string;

  // tipo de curso
  courseType?: string;

  userType?: 'student' | 'teacher' | 'admin';

  // historial de calificaciones por año
  gradesHistory?: GradeHistory[];
};

export type FullUser = User & {
  pass: string;
};
