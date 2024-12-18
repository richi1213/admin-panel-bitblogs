import { lazy, Suspense } from 'react';
import { Spin } from 'antd';

const LazyCreateBlogPage = lazy(() => import('../components/create-blog-page'));

export const CreateBlogPage: React.FC = () => {
  return (
    <Suspense fallback={<Spin />}>
      <LazyCreateBlogPage />
    </Suspense>
  );
};
