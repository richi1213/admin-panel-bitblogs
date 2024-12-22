import { Button, Form, Input, Upload, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useTagContext } from '@/context/tags/tag-context';
import { Tag } from '@/supabase';
import { BlogFormValues } from '@/pages/create-blog/components/form/types';
import { useCreateBlog } from '@/pages/create-blog/hooks';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/atoms';

export const BlogForm: React.FC = () => {
  const user = useAtomValue(userAtom);
  const { tags } = useTagContext();

  const [form] = Form.useForm<BlogFormValues>();

  const { mutate } = useCreateBlog();

  const onFinish = (values: BlogFormValues) => {
    const imageFile = (
      Array.isArray(values.imageFile) ? values.imageFile[0] : values.imageFile
    )?.originFileObj;

    mutate({
      ...values,
      imageFile,
      userId: user.userInfo?.id,
    });

    console.log(values);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout='vertical'
      className='w-full space-y-4 sm:w-4/5'
      initialValues={{
        tags_ids: [],
      }}
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
        valuePropName='fileList'
        getValueFromEvent={normFile}
        rules={[{ required: true, message: 'Please upload an image.' }]}
      >
        <Upload
          name='image'
          listType='picture'
          maxCount={1}
          beforeUpload={() => false}
        >
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
