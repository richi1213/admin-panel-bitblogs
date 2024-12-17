import { lazy, Suspense } from 'react';
import { Spin } from 'antd';

const LazyUsersPage = lazy(() => import('../components/users-page'));

export const UsersPage: React.FC = () => {
  return (
    <>
      <Suspense fallback={<Spin />}>
        <LazyUsersPage />
      </Suspense>
    </>
  );
};
