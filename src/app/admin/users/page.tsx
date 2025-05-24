import { withAdminSession } from '../_hocs/admin-session';
import { UsersAdminPage } from './UserAdminPage';

export default withAdminSession(UsersAdminPage);
