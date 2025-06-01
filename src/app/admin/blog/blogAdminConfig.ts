import { FieldConfig } from '@/components/sections/AdminForm';
import { BlogEntry } from '@/types/blog-entry';
import { EventEntry } from '@/types/event-entry';

export const emptyBlogFields: BlogEntry = {
  title: '',
  content: '',
  author: '',
  date: new Date(),
  tags: [],

  isEvent: false,
  startDate: new Date(),
  expireDate: new Date(),
};

export const blogFieldConfig: Record<
  keyof Omit<EventEntry, 'coverImg'>,
  FieldConfig
> = {
  title: {
    type: 'text',
    label: 'Título',
    placeholder: 'Escribe un título...',
    required: true,
  },
  content: {
    type: 'area',
    rows: 5,
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
  isEvent: {
    type: 'switch',
    label: 'Es un Evento',
  },
  startDate: {
    type: 'date',
    label: 'SOLO para eventos: Fecha de Inicio',
  },
  expireDate: {
    type: 'date',
    label: 'SOLO para eventos: Fecha de Finalización',
  },
};
