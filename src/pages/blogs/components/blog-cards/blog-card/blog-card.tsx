import React, { useState } from 'react';
import { Card, Typography, Tag, Space, Dropdown, Spin } from 'antd';
import {
  UserOutlined,
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { BlogCardProps } from '@/pages/blogs/components/blog-cards/blog-card/types';
import { formatDate } from '@/utils';
import EditBlogModal from '@/pages/blogs/components/blog-cards/blog-card/modal/edit-blog-modal';
import { useBlogData, useDeleteBlog, useUpdateBlog } from '@/pages/blogs/hooks';

const { Title, Paragraph } = Typography;

export const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { title_en, created_at, image_url, description_en, user_id, tag_ids } =
    blog;

  const blogImageUrl = image_url
    ? `${import.meta.env.VITE_SUPABASE_BLOG_IMAGES_STORAGE_URL}/${image_url}`
    : '';

  const { authorProfile, tags, isAuthorLoading, areTagsLoading } = useBlogData(
    user_id as string,
    tag_ids as number[],
  );
  const { deleteBlogById } = useDeleteBlog();
  const { updateBlogById } = useUpdateBlog();

  if (isAuthorLoading || areTagsLoading) {
    return <Spin />;
  }

  const authorName = authorProfile?.full_name_en || 'Unknown Author';
  const formattedDate = formatDate(created_at);

  const handleMenuClick = (e: { key: string }) => {
    if (e.key === 'edit') {
      setIsModalVisible(true);
    } else if (e.key === 'delete') {
      deleteBlogById(blog.id);
    }
  };

  const handleUpdateBlog = (
    newTitle: string | null,
    newDescription: string | null,
  ) => {
    updateBlogById({
      id: blog.id,
      title_en: newTitle || '',
      description_en: newDescription || '',
    });
  };

  const items = [
    {
      label: 'Edit',
      key: 'edit',
      icon: <EditOutlined />,
    },
    {
      label: 'Delete',
      key: 'delete',
      icon: <DeleteOutlined />,
      danger: true,
    },
  ];

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

      <Dropdown
        menu={{ items, onClick: handleMenuClick }}
        trigger={['click']}
        className='absolute right-2 top-2'
      >
        <EllipsisOutlined style={{ fontSize: '18px', cursor: 'pointer' }} />
      </Dropdown>

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

      <EditBlogModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleUpdateBlog}
        title={title_en}
        description={description_en}
      />
    </Card>
  );
};
