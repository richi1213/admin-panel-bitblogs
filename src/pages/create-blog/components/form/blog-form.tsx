import { Button, Form, Input, Upload, notification, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  BlogsInsertPayload,
  insertBlog,
  uploadImage,
} from '@/supabase/api/blogs';
import { userAtom } from '@/atoms';
import { useTagContext } from '@/context/tags/tag-context';
import { Tag } from '@/supabase';
import { useAtomValue } from 'jotai';
import { BlogFormValues } from '@/pages/create-blog/components/form/types';
import type { UploadFile } from 'antd/es/upload/interface';

export const BlogForm: React.FC = () => {
  const user = useAtomValue(userAtom);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { tags } = useTagContext();

  const [form] = Form.useForm<BlogFormValues>();

  const { mutate } = useMutation({
    mutationFn: async (formValues: BlogFormValues) => {
      if (formValues.imageFile) {
        const imageUrl = await uploadImage(formValues.imageFile);
        const insertBlogPayload: BlogsInsertPayload = {
          title_en: formValues.titleEn,
          title_ka: formValues.titleKa,
          description_en: formValues.descriptionEn,
          description_ka: formValues.descriptionKa,
          image_url: imageUrl || '',
          user_id: user.userInfo?.id,
          tag_ids: formValues.tags_ids,
        };
        return await insertBlog(insertBlogPayload);
      }
    },
    onSuccess: () => {
      notification.success({
        message: 'Blog Created',
        description: 'You have successfully posted your blog!',
      });
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      form.resetFields();
      navigate('/dashboard');
    },
    onError: (error: Error) => {
      console.error(error);
      notification.error({
        message: 'Error',
        description: error.message || 'Failed to create blog.',
      });
    },
  });

  const onFinish = (values: BlogFormValues) => {
    if (!user.isLoggedIn) {
      notification.warning({
        message: 'Authentication Required',
        description: 'Please log in to create a blog.',
      });
      navigate('/login');
      return;
    }

    mutate(values);
  };

  const validateFile = (file: UploadFile) => {
    const isImage = file.type?.startsWith('image/');
    if (!isImage) {
      notification.error({
        message: 'Invalid File Type',
        description: 'Only image files are allowed.',
      });
    }
    return isImage;
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout='vertical'
      className='w-full space-y-4 sm:w-4/5'
    >
      <Form.Item
        label='Title (English)'
        name='titleEn'
        rules={[{ required: true, message: 'Title (English) is required.' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Title (Georgian)'
        name='titleKa'
        rules={[{ required: true, message: 'Title (Georgian) is required.' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Description (English)'
        name='descriptionEn'
        rules={[
          { required: true, message: 'Description (English) is required.' },
        ]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        label='Description (Georgian)'
        name='descriptionKa'
        rules={[
          { required: true, message: 'Description (Georgian) is required.' },
        ]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        label='Tags'
        name='tags_ids'
        rules={[{ required: true, message: 'Please select at least one tag.' }]}
      >
        <Select mode='multiple' placeholder='Select tags'>
          {tags?.map((tag: Tag) => (
            <Select.Option key={tag.id} value={tag.id}>
              {tag.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label='Image'
        name='imageFile'
        // rules={[{ required: true, message: 'Please upload an image.' }]}
      >
        <Upload
          beforeUpload={validateFile}
          maxCount={1}
          fileList={form.getFieldValue('imageFile') || []}
          onChange={(info) => {
            form.setFieldsValue({ imageFile: info.fileList });
          }}
        >
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Create Blog
        </Button>
      </Form.Item>
    </Form>
  );
};
