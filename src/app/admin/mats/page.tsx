import { withAdminSession } from '@/features/ui/hocs/admin-session';
import { MatsAdminPage } from './MatsAdminPage';

export default withAdminSession(MatsAdminPage);
