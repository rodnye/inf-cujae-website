import { FieldConfig } from '@/components/sections/AdminForm';
import { BlogEntry } from '@/types/blog-entry';

export const emptyBlogFields: BlogEntry = {
  title: '',
  content: '',
  author: '',
  date: new Date(),
  tags: [],
};

export const blogFieldConfig: Record<keyof BlogEntry, FieldConfig> = {
  title: {
    type: 'text',
    label: 'Título',
    placeholder: 'Escribe un título...',
    required: true,
  },
  content: {
    type: 'text',
    label: 'Contenido',
    placeholder: 'Escribe el contenido...',
    required: true,
  },
  author: {
    type: 'text',
    label: 'Autor',
    placeholder: 'Nombre del autor',
    required: true,
  },
  date: {
    type: 'date',
    label: 'Fecha',
    required: true,
  },
  tags: {
    type: 'tags',
    label: 'Etiquetas',
  },
};
