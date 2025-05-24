import { Button } from '@/components/buttons/Button';
import { withAdminSession } from './_hocs/admin-session';
import { FaBookAtlas, FaUsers, FaCubes } from 'react-icons/fa6';

export default withAdminSession(() => {
  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="m-6 text-2xl font-bold">Hola admin ;{')'}</h1>

      <section className="flex flex-col space-y-3">
        <Button icon={<FaBookAtlas />} to="/admin/blog">
          Administración del Blog
        </Button>
        <Button icon={<FaUsers />} to="/admin/users">
          Administración de Usuarios
        </Button>
        <Button icon={<FaCubes />} to="/admin/mats">
          Administración de Materiales
        </Button>
      </section>
    </div>
  );
});
