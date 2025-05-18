import { withAdminSession } from '../_hocs/admin-session';
import { BlogAdminPage } from './Component';

export default withAdminSession(BlogAdminPage);
