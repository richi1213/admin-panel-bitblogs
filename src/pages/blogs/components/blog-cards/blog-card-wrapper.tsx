import { useBlogContext } from '@/context';
import { BlogCard } from '@/pages/blogs/components/blog-cards/blog-card/blog-card';
import { Spin } from 'antd';
import React from 'react';

export const BlogCardsWrapper: React.FC = () => {
  const { blogs, isLoading, isError } = useBlogContext();

  if (isLoading) {
    return <Spin />;
  }

  if (isError || !blogs) {
    return <div>Error fetching blogs</div>;
  }

  return (
    <section className='flex flex-col space-y-8 md:col-span-8 lg:col-span-9 xl:col-span-10'>
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </section>
  );
};
