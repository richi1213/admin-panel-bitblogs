import { lazy, Suspense } from 'react';
import { Spin } from 'antd';

const LazyLoginPage = lazy(() => import('../components/login-page'));

export const LoginPage: React.FC = () => {
  return (
    <>
      <Suspense fallback={<Spin tip='Loading...' />}>
        <LazyLoginPage />
      </Suspense>
    </>
  );
};
