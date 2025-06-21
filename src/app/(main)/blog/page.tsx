import { BlogCards } from '@/features/blog/ui/BlogCards';
import {
  FiFileText,
  FiLoader,
  FiAlertTriangle,
  FiArchive,
} from 'react-icons/fi'; // Importar iconos

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0b1013] py-12 text-slate-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="relative inline-block">
            <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-yellow-500/30 via-amber-500/30 to-yellow-500/30 blur-3xl"></div>
            <div className="relative flex items-center justify-center gap-4">
              <div className="rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 p-4 shadow-2xl">
                <FiFileText className="h-10 w-10 text-white" />
              </div>
              <h1 className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent lg:text-6xl">
                Nuestro Blog
              </h1>
            </div>
          </div>
          <p className="mt-6 text-lg text-slate-400">
            Artículos, noticias y más del acontecer universitario.
          </p>
        </div>

        <BlogCards
          fallback={
            <div className="flex min-h-screen flex-col items-center justify-center bg-[#0b1013] p-6 text-slate-100">
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 opacity-20 blur-lg"></div>
                <FiLoader className="relative mb-6 h-16 w-16 animate-spin text-yellow-400" />
              </div>
              <div className="text-center">
                <p className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-2xl font-semibold text-transparent">
                  Cargando blogs...
                </p>
                <div className="mt-3 h-1 w-64 overflow-hidden rounded-full bg-slate-700">
                  <div className="h-full w-full animate-pulse bg-gradient-to-r from-yellow-500 to-amber-500"></div>
                </div>
              </div>
            </div>
          }
          errorFallback={
            <div className="flex min-h-screen flex-col items-center justify-center bg-[#0b1013] p-6 text-slate-100">
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-red-500 to-orange-500 opacity-20 blur-lg"></div>
                <FiAlertTriangle className="relative mb-6 h-16 w-16 text-red-400" />
              </div>
              <div className="max-w-md text-center">
                <p className="mb-2 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-2xl font-semibold text-transparent">
                  Error al cargar blogs
                </p>
                {
                  //<p className="rounded-lg bg-red-900/30 p-3 text-sm text-red-300 backdrop-blur-sm">
                  //{error}
                  //</p>
                }
              </div>
            </div>
          }
          emptyFallback={
            <div className="py-16 text-center">
              <div className="relative inline-block">
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-slate-600/30 to-slate-500/30 blur-lg"></div>
                <FiArchive className="relative mx-auto mb-4 h-16 w-16 text-slate-500" />
              </div>
              <p className="mb-2 text-xl text-slate-400">
                No hay artículos de blog disponibles en este momento.
              </p>
              <p className="text-slate-500">
                Vuelve pronto para leer nuestras últimas publicaciones.
              </p>
            </div>
          }
        />
      </div>
    </div>
  );
}
