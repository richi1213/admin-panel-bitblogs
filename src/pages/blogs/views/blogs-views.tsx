import { lazy, Suspense } from 'react';
import { Spin } from 'antd';

const LazyBlogsPage = lazy(() => import('../components/blogs-page'));

export const BlogsPage: React.FC = () => {
  return (
    <Suspense fallback={<Spin />}>
      <LazyBlogsPage />
    </Suspense>
  );
};
