import { withAdminSession } from '../_hocs/admin-session';
import { MatsAdminPage } from './MatsAdminPage';

export default withAdminSession(MatsAdminPage);
