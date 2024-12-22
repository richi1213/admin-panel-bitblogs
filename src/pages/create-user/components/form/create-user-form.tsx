import { Form, Input, Button } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { CreateUserPayload } from '@/supabase';
import { useCreateUser } from '@/pages/create-user/hooks';

export const CreateUserForm: React.FC = () => {
  const [form] = Form.useForm();

  const { mutate, isPending } = useCreateUser();

  const onFinish = (values: CreateUserPayload) => {
    mutate(values);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name='create_user'
      onFinish={onFinish}
      layout='vertical'
      className='mx-auto max-w-[600px]'
    >
      <Form.Item
        name='fullNameEn'
        label='Full Name (English)'
        rules={[
          {
            required: true,
            message: 'Please input your full name in English!',
          },
        ]}
      >
        <Input prefix={<UserOutlined />} />
      </Form.Item>

      <Form.Item
        name='fullNameKa'
        label='Full Name (Georgian)'
        rules={[
          {
            required: true,
            message: 'Please input your full name in Georgian!',
          },
        ]}
      >
        <Input prefix={<UserOutlined />} />
      </Form.Item>

      <Form.Item
        name='username'
        label='Username'
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input prefix={<UserOutlined />} />
      </Form.Item>

      <Form.Item
        name='email'
        label='Email'
        rules={[
          { required: true, message: 'Please input your email!' },
          { type: 'email', message: 'The input is not valid email!' },
        ]}
      >
        <Input prefix={<MailOutlined />} />
      </Form.Item>

      <Form.Item
        name='password'
        label='Password'
        rules={[{ required: true, message: 'Please input your password!' }]}
        hasFeedback
      >
        <Input.Password prefix={<LockOutlined />} />
      </Form.Item>

      <Form.Item
        name='confirmPassword'
        label='Confirm Password'
        dependencies={['password']}
        hasFeedback
        rules={[
          { required: true, message: 'Please confirm your password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('The two passwords do not match!'),
              );
            },
          }),
        ]}
      >
        <Input.Password prefix={<LockOutlined />} />
      </Form.Item>

      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          className='w-full'
          disabled={isPending}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
