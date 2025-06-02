'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUser,
  FiLoader,
  FiAlertTriangle,
  FiEye,
} from 'react-icons/fi';

interface EventItem {
  id: string;
  title: string;
  content: string; // Descripción del evento
  author: string;
  slug?: string; // Parece que no viene en la API
  createdAt: Date; // Mapearemos desde 'date'
  updatedAt?: Date;
  published?: boolean;
  imageUrl?: string;
  // Campos adicionales específicos de eventos
  eventDate?: Date; // Mapearemos desde 'startDate'
  expireDate?: Date; // Campo nuevo que viene de la API
  location?: string;
  category?: string;
  tags?: string[]; // Campo nuevo que viene de la API
  isEvent?: boolean; // Campo nuevo que viene de la API
}

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming');

  // Función helper para convertir strings a Date de manera segura
  const parseDate = (dateString: any): Date | undefined => {
    if (!dateString) return undefined;

    try {
      const date = new Date(dateString);
      // Verificar si la fecha es válida
      if (isNaN(date.getTime())) {
        console.warn(`Fecha inválida: ${dateString}`);
        return undefined;
      }
      return date;
    } catch (error) {
      console.warn(`Error al parsear fecha: ${dateString}`, error);
      return undefined;
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error(`Error al obtener eventos: ${response.statusText}`);
        }
        const data = await response.json();

        console.log('Datos recibidos de la API:', data); // Para debug

        // Ajustar según la estructura que devuelve tu API
        const eventsData =
          data?.entries || data?.events || data?.slug || data?.slugs || [];

        if (Array.isArray(eventsData)) {
          // Convertir las fechas de string a Date con validación
          const processedEvents = eventsData.map((event: any) => {
            console.log('Procesando evento:', event); // Para debug

            // Mapear los campos correctos de la API
            const createdAt = parseDate(event.date); // 'date' del API -> 'createdAt'
            const eventDate = parseDate(event.startDate); // 'startDate' del API -> 'eventDate'
            const expireDate = parseDate(event.expireDate); // Nuevo campo
            const updatedAt = parseDate(event.updatedAt); // Si existe

            // Log para debug de fechas específicas
            console.log(`Evento ${event.title}:`, {
              apiDate: event.date,
              apiStartDate: event.startDate,
              apiExpireDate: event.expireDate,
              parsedCreatedAt: createdAt,
              parsedEventDate: eventDate,
              parsedExpireDate: expireDate,
            });

            return {
              id: event.id,
              title: event.title,
              content: event.content,
              author: event.author,
              slug: event.slug || event.id, // Usar ID como slug si no existe
              createdAt: createdAt || new Date(), // Fallback a fecha actual
              updatedAt,
              eventDate, // Fecha de inicio del evento
              expireDate, // Fecha de finalización del evento
              published: true, // Asumir que están publicados si vienen de la API
              imageUrl: event.imageUrl,
              location: event.location,
              category: event.category,
              tags: event.tags,
              isEvent: event.isEvent,
            };
          });

          console.log('Eventos procesados:', processedEvents); // Para debug
          setEvents(processedEvents);
        } else {
          console.warn(
            'La respuesta de la API no tiene el formato esperado:',
            data,
          );
          setEvents([]);
          setError('Formato de datos inesperado de la API.');
        }
      } catch (err) {
        console.error(err);
        setError(
          err instanceof Error ? err.message : 'Un error desconocido ocurrió.',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (date: Date | undefined) => {
    if (!date || isNaN(date.getTime())) {
      return 'Fecha no disponible';
    }

    try {
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        // Se eliminan hour y minute para no mostrar la hora
      });
    } catch (e) {
      return 'Fecha inválida';
    }
  };

  const isUpcoming = (date: Date | undefined) => {
    if (!date || isNaN(date.getTime())) {
      return true; // Por defecto, considerar como próximo si no hay fecha válida
    }

    try {
      return date >= new Date();
    } catch {
      return true;
    }
  };

  // Función para obtener la fecha a mostrar (prioriza eventDate sobre createdAt)
  const getDisplayDate = (event: EventItem): Date | undefined => {
    return event.eventDate || event.createdAt;
  };

  // Función para obtener el tipo de fecha que se está mostrando
  const getDateType = (event: EventItem): 'event' | 'created' | 'none' => {
    if (event.eventDate) return 'event';
    if (event.createdAt) return 'created';
    return 'none';
  };

  const getFilteredEvents = () => {
    if (filter === 'all') return events;
    if (filter === 'upcoming')
      return events.filter((event) => isUpcoming(getDisplayDate(event)));
    if (filter === 'past')
      return events.filter((event) => !isUpcoming(getDisplayDate(event)));
    return events;
  };

  const filteredEvents = getFilteredEvents();

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0b1013] p-6">
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 opacity-20 blur-lg"></div>
          <FiLoader className="relative mb-6 h-16 w-16 animate-spin text-yellow-400" />
        </div>
        <div className="text-center">
          <p className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-2xl font-semibold text-transparent">
            Cargando eventos...
          </p>
          <div className="mt-3 h-1 w-64 overflow-hidden rounded-full bg-[#36454F]">
            <div className="h-full w-full animate-pulse bg-gradient-to-r from-yellow-500 to-amber-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0b1013] p-6">
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-red-500 to-orange-500 opacity-20 blur-lg"></div>
          <FiAlertTriangle className="relative mb-6 h-16 w-16 text-red-400" />
        </div>
        <div className="max-w-md text-center">
          <p className="mb-2 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-2xl font-semibold text-transparent">
            Error al cargar eventos
          </p>
          <p className="rounded-lg bg-red-900/30 p-3 text-sm text-red-300 backdrop-blur-sm">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b1013] py-12 text-slate-100">
      <div className="container mx-auto px-4">
        {/* Header mejorado */}
        <div className="mb-12 text-center">
          <div className="relative inline-block">
            <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-yellow-500/30 via-amber-500/30 to-yellow-500/30 blur-3xl"></div>
            <div className="relative flex items-center justify-center gap-4">
              <div className="rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 p-4 shadow-2xl">
                <FiCalendar className="h-10 w-10 text-white" />
              </div>
              <h1 className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent lg:text-6xl">
                Eventos CUJAE
              </h1>
            </div>
          </div>
          <p className="mt-6 text-lg text-slate-400">
            Mantente al día con todos los eventos y actividades de nuestra
            universidad
          </p>
        </div>

        {/* Filtros */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-xl bg-[#36454F]/60 p-1 backdrop-blur-sm">
            {[
              { key: 'upcoming', label: 'Próximos', icon: FiClock },
              { key: 'all', label: 'Todos', icon: FiCalendar },
              { key: 'past', label: 'Pasados', icon: FiEye },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setFilter(key as any)}
                className={`relative flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-all duration-200 ${
                  filter === key
                    ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-[#36454F]/50 hover:text-white'
                }`}
              >
                {filter === key && (
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/20 to-amber-400/20 blur-sm"></div>
                )}
                <Icon className="h-4 w-4" />
                <span className="relative">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid de eventos */}
        {filteredEvents.length === 0 ? (
          <div className="py-16 text-center">
            <div className="relative inline-block">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#36454F]/30 to-[#36454F]/30 blur-lg"></div>
              <FiCalendar className="relative mx-auto mb-4 h-16 w-16 text-[#36454F]" />
            </div>
            <p className="mb-2 text-xl text-slate-400">
              {filter === 'upcoming'
                ? 'No hay eventos próximos programados'
                : filter === 'past'
                  ? 'No hay eventos pasados registrados'
                  : 'No hay eventos disponibles'}
            </p>
            <p className="text-slate-500">
              Vuelve pronto para ver las próximas actividades
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredEvents.map((event, index) => {
              const eventDate = event.eventDate || event.createdAt;
              const upcoming = isUpcoming(eventDate);

              return (
                <Link
                  key={event.id}
                  href={`/events/${event.slug}`}
                  className="group block rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-[#0b1013]"
                >
                  <article
                    className="relative h-full overflow-hidden rounded-2xl border border-[#36454F]/50 bg-[#36454F]/60 backdrop-blur-xl transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:border-yellow-500/50 group-hover:shadow-2xl group-hover:shadow-yellow-500/20"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    {/* Imagen del evento */}
                    {event.imageUrl && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#36454F]/80 via-transparent to-transparent"></div>

                        {/* Badge de estado */}
                        <div className="absolute right-4 top-4">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm ${
                              upcoming
                                ? 'border border-green-500/30 bg-green-500/20 text-green-300'
                                : 'border border-[#36454F]/30 bg-[#36454F]/20 text-slate-300'
                            }`}
                          >
                            <FiClock className="h-3 w-3" />
                            {upcoming ? 'Próximo' : 'Finalizado'}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex h-full flex-col p-6">
                      {/* Tags/Categorías */}
                      {event.tags && event.tags.length > 0 && (
                        <div className="mb-3 flex flex-wrap gap-2">
                          {event.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="inline-block rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-medium text-yellow-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      {/* Título */}
                      <h2 className="mb-3 text-xl font-bold text-slate-100 transition-colors group-hover:text-yellow-300">
                        {event.title}
                      </h2>
                      {/* Información del evento */}
                      <div className="mb-4 space-y-2 text-sm text-slate-400">
                        <div className="flex items-center gap-2">
                          <FiCalendar className="h-4 w-4 text-yellow-400" />
                          <div className="flex flex-col">
                            <span>{formatDate(getDisplayDate(event))}</span>
                            <span className="text-xs text-slate-500">
                              {getDateType(event) === 'event'
                                ? 'Fecha de inicio'
                                : getDateType(event) === 'created'
                                  ? 'Fecha de publicación'
                                  : 'Sin fecha específica'}
                            </span>
                          </div>
                        </div>

                        {/* Mostrar fecha de finalización si existe */}
                        {event.expireDate && (
                          <div className="flex items-center gap-2">
                            <FiClock className="h-4 w-4 text-amber-400" />
                            <div className="flex flex-col">
                              <span>{formatDate(event.expireDate)}</span>
                              <span className="text-xs text-slate-500">
                                Fecha de finalización
                              </span>
                            </div>
                          </div>
                        )}

                        {event.location && (
                          <div className="flex items-center gap-2">
                            <FiMapPin className="h-4 w-4 text-amber-400" />
                            <span>{event.location}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          <FiUser className="h-4 w-4 text-slate-400" />
                          <span>Organizado por {event.author}</span>
                        </div>
                      </div>
                      {/* Contenido/descripción */}
                      <p className="mb-6 line-clamp-3 flex-grow leading-relaxed text-slate-300">
                        {event.content
                          .replace(/<[^>]*>/g, '')
                          .substring(0, 150)}
                        {event.content.length > 150 && '...'}
                      </p>
                      {/* Botón de acción */}
                      <div className="mt-auto pt-4">
                        <span // Este span simula un botón, pero el Link padre maneja la navegación
                          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:from-yellow-400 hover:to-amber-400 hover:shadow-xl hover:shadow-yellow-500/25 active:scale-95"
                        >
                          Ver Detalles
                          <svg
                            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>

                    {/* Efecto de hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-500/5 to-amber-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}

        {/* Contador de eventos */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-xl bg-[#36454F]/60 px-6 py-3 backdrop-blur-sm">
            <FiCalendar className="h-5 w-5 text-yellow-400" />
            <span className="text-slate-300">
              Mostrando{' '}
              <span className="font-semibold text-yellow-400">
                {filteredEvents.length}
              </span>{' '}
              de{' '}
              <span className="font-semibold text-yellow-400">
                {events.length}
              </span>{' '}
              eventos
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
