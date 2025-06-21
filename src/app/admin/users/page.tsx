import { withAdminSession } from '@/features/ui/hocs/admin-session';
import { UsersAdminPage } from './UserAdminPage';

export default withAdminSession(UsersAdminPage);
