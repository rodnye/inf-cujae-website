import { FieldConfig } from '@/components/sections/AdminForm';
import { FullUser } from '@/types/user';

export const emptyUserFields: FullUser & { rpass: string } = {
  cid: '',
  name: '',
  year: 0,
  pass: '',
  rpass: '',
  email: '',
  address: '',
  phone: '',
  courseType: '',
  userType: 'student',
  gradesHistory: {},
};

export const userFieldConfig: Record<
  keyof (FullUser & { rpass: string }),
  FieldConfig
> = {
  cid: {
    type: 'text',
    label: 'Carnet de ID',
    placeholder: 'Ej: 1234567890',
    required: true,
  },
  name: {
    type: 'text',
    label: 'Nombre Completo',
    placeholder: 'Nombre del usuario',
    required: true,
  },
  year: {
    type: 'number',
    label: 'Grado',
    required: true,
  },
  email: {
    type: 'email',
    label: 'Email (Opcional)',
    placeholder: 'usuario@ejemplo.com',
  },
  address: {
    type: 'text',
    label: 'Dirección (Opcional)',
    placeholder: 'Dirección del usuario',
  },
  phone: {
    type: 'text',
    label: 'Teléfono (Opcional)',
    placeholder: 'Número de teléfono',
  },
  courseType: {
    type: 'text',
    label: 'Tipo de Curso (Opcional)',
    placeholder: 'Tipo de curso',
  },
  userType: {
    type: 'select',
    label: 'Tipo de Usuario',
    options: [
      { value: 'student', label: 'Estudiante' },
      { value: 'teacher', label: 'Profesor' },
      { value: 'admin', label: 'Administrador' },
    ],
  },
  pass: {
    type: 'password',
    label: 'Contraseña',
    required: true,
  },
  rpass: {
    type: 'password',
    label: 'Repetir Contraseña',
    required: true,
  },
  gradesHistory: {
    type: 'text',
    label: 'Historial de Notas',
    disabled: true,
  },
};
