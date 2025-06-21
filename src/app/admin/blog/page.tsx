import { withAdminSession } from '@/features/ui/hocs/admin-session';
import { BlogAdminPage } from '@/app/admin/blog/BlogAdminPage';

export default withAdminSession(BlogAdminPage);
