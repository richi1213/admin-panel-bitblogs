import { Navigate, Outlet } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/atoms';
import { DASHBOARD_LAYOUT_PATH } from '@/routes/layouts';

export const IsAuthorizedGuard: React.FC = () => {
  const user = useAtomValue(userAtom);

  if (user.isLoggedIn) {
    return <Navigate to={DASHBOARD_LAYOUT_PATH.DASHBOARD} />;
  }

  return <Outlet />;
};
