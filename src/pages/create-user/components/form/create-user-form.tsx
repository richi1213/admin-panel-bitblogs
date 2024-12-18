import { Form, Input, Button, notification } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from '@/supabase';
import { CreateUserPayload } from '@/supabase/api/users/types';
import { useNavigate } from 'react-router-dom';

export const CreateUserForm: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: ['createUser'],
    mutationFn: (newUserData: CreateUserPayload) => createUser(newUserData),
    onSuccess: () => {
      notification.success({
        message: 'User created successfully!',
        duration: 2,
      });
      navigate('/dashboard');
    },
    onError: () => {
      notification.error({
        message: 'Error creating user',
        description: 'An error occurred while creating the user',
        duration: 2,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const [form] = Form.useForm();

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
