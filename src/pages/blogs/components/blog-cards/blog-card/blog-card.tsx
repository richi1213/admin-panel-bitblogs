import React from 'react';
import { Card, Typography, Tag, Space, Skeleton } from 'antd';
import { UserOutlined, EllipsisOutlined } from '@ant-design/icons';
import { BlogCardProps } from '@/pages/blogs/components/blog-cards/blog-card/types';
import { formatDate } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { fetchTagsByIds, fetchUserProfile } from '@/supabase';

const { Title, Paragraph } = Typography;

export const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  if (!blog) {
    return <div>No blog data available</div>;
  }

  const { title_en, created_at, image_url, description_en, user_id, tag_ids } =
    blog;

  const blogImageUrl = image_url
    ? `${import.meta.env.VITE_SUPABASE_BLOG_IMAGES_STORAGE_URL}/${image_url}`
    : '';

  const formattedDate = formatDate(created_at);

  const { data: authorProfile, isLoading: isAuthorLoading } = useQuery({
    queryKey: ['userProfile', user_id],
    queryFn: () => fetchUserProfile(user_id as string),
    enabled: !!user_id,
  });

  const { data: tags, isLoading: areTagsLoading } = useQuery({
    queryKey: ['tags', tag_ids],
    queryFn: () => fetchTagsByIds(tag_ids || []),
    enabled: !!(tag_ids && tag_ids.length > 0),
  });

  console.log(tags);

  if (isAuthorLoading || areTagsLoading) {
    return <Skeleton active />;
  }

  const authorName = authorProfile?.full_name_en || 'Unknown Author';

  return (
    <Card className='overflow-hidden p-4 transition-all hover:shadow-lg'>
      <div className='relative'>
        <img
          src={blogImageUrl}
          alt={title_en || ''}
          className='h-[200px] w-full rounded-lg object-cover'
        />
      </div>
      <Card.Meta
        title={
          <Title
            level={3}
            className='text-2xl font-bold tracking-tight hover:text-blue-500'
          >
            {title_en}
          </Title>
        }
        description={
          <div className='flex items-center gap-4 text-sm text-gray-500'>
            <Space>
              <UserOutlined />
              <span className='hover:underline'>{authorName}</span>
            </Space>
            <EllipsisOutlined />
            <span>{formattedDate}</span>
          </div>
        }
      />
      <Paragraph className='mt-4 text-gray-500'>
        {description_en || 'No description available'}
      </Paragraph>
      <div className='mt-4 flex flex-wrap gap-2'>
        {tags?.map((tag) => (
          <Tag key={tag.id} color='blue' className='bg-blue-400 text-white'>
            {tag.name}
          </Tag>
        ))}
      </div>
    </Card>
  );
};
