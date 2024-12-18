import { lazy, Suspense } from 'react';
import { Spin } from 'antd';

const LazyCreateUserPage = lazy(() => import('../components/create-user-page'));

export const CreateUserPage: React.FC = () => {
  return (
    <Suspense fallback={<Spin />}>
      <LazyCreateUserPage />
    </Suspense>
  );
};
