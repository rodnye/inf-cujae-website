import { withAdminSession } from '../_hocs/admin-session';
import { BlogAdminPage } from './BlogAdminPage';

export default withAdminSession(BlogAdminPage);
