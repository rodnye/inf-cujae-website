import { withAdminSession } from './hocs/withAdminSession';

export default withAdminSession(() => {
  return <div className="flex flex-col">Autenticado!!!</div>;
});
