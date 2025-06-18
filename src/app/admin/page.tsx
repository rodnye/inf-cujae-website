import { Button } from '@/components/buttons/Button';
import { withAdminSession } from './_hocs/admin-session';
import { FaBookAtlas, FaUsers, FaCubes, FaDatabase } from 'react-icons/fa6';
import { FaShieldAlt } from 'react-icons/fa';

export default withAdminSession(() => {
  return (
    <div className="min-h-screen bg-[#0b1013] p-6">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-6 inline-block rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 p-4">
            <FaShieldAlt className="h-10 w-10 text-white" />
          </div>
          <h1 className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-3xl font-bold text-transparent">
            Panel de Administración
          </h1>
          <p className="mt-2 text-slate-400">Hola admin! 👋</p>
        </div>

        {/* Navigation Cards */}
        <div className="space-y-4">
          <div className="rounded-xl border border-[#36454F]/50 bg-[#36454F]/20 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-purple-500/20 p-3">
                  <FaBookAtlas className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-200">Blog</h3>
                  <p className="text-sm text-slate-400">Gestionar artículos</p>
                </div>
              </div>
              <Button icon={<FaBookAtlas />} to="/admin/blog">
                Acceder
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-[#36454F]/50 bg-[#36454F]/20 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-blue-500/20 p-3">
                  <FaUsers className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-200">Usuarios</h3>
                  <p className="text-sm text-slate-400">Control de acceso</p>
                </div>
              </div>
              <Button icon={<FaUsers />} to="/admin/users">
                Acceder
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-[#36454F]/50 bg-[#36454F]/20 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-green-500/20 p-3">
                  <FaCubes className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-200">Materiales</h3>
                  <p className="text-sm text-slate-400">Recursos educativos</p>
                </div>
              </div>
              <Button icon={<FaCubes />} to="/admin/mats">
                Acceder
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-[#36454F]/50 bg-[#36454F]/20 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-orange-500/20 p-3">
                  <FaDatabase className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-200">Respaldos</h3>
                  <p className="text-sm text-slate-400">Copias de seguridad</p>
                </div>
              </div>
              <Button icon={<FaDatabase />} to="/admin/backup">
                Acceder
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
