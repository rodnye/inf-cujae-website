import { withAdminSession } from '../_hocs/admin-session';
import { BackupPage } from './BackupPage';

export default withAdminSession(BackupPage);
