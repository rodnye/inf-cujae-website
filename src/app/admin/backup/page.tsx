import { withAdminSession } from '@/features/ui/hocs/admin-session';
import { BackupPage } from './BackupPage';

export default withAdminSession(BackupPage);
