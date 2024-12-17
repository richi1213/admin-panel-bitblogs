import { Navigate, Outlet } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/atoms';

export const IsAuthorizedGuard: React.FC = () => {
  const user = useAtomValue(userAtom);

  if (user.isLoggedIn) {
    return <Navigate to='/dashboard' />;
  }

  return <Outlet />;
};
