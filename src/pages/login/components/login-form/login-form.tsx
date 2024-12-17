import { Link } from 'react-router-dom';
import { Button, Form, Input, Spin, Card } from 'antd';
import { useMutation } from '@tanstack/react-query';
import useLoginHandlers from '@/pages/login/components/login-form/hooks/use-login-handlers';
import { login } from '@/supabase';

export function LoginForm() {
  const { handleLoginSuccess, handleLoginError } = useLoginHandlers();

  const { mutate: loginAuthor, status } = useMutation({
    mutationFn: login,
    onSuccess: handleLoginSuccess,
    onError: handleLoginError,
  });

  const onFinish = (values: { email: string; password: string }) => {
    loginAuthor({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <Card
      title={
        <div className='flex flex-col items-center text-center'>
          <h2 className='text-2xl'>Login to BB</h2>
          <p>Enter your info to login</p>
        </div>
      }
      className='text-card-foreground mx-auto w-full max-w-md'
    >
      <Form
        name='login-form'
        onFinish={onFinish}
        initialValues={{
          email: '',
          password: '',
        }}
        layout='vertical'
        validateMessages={{
          required: 'This field is required.',
          types: {
            email: 'Please enter a valid email.',
          },
        }}
      >
        <Form.Item
          name='email'
          label='Email'
          rules={[{ required: true }, { type: 'email' }]}
        >
          <Input placeholder='john@example.com' />
        </Form.Item>

        <Form.Item
          name='password'
          label='Password'
          rules={[{ required: true, message: 'Password is required.' }]}
        >
          <Input.Password />
        </Form.Item>

        <Button
          type='primary'
          htmlType='submit'
          className='bg-primary/85 text-foreground hover:bg-primary/90 w-full'
          disabled={status === 'pending'}
        >
          {status === 'pending' ? <Spin /> : 'Login'}
        </Button>
      </Form>

      <div className='mt-4 text-center text-sm'>
        Don't have an account?{' '}
        <Link to='/register' className='text-primary hover:underline'>
          Sign up
        </Link>
      </div>
    </Card>
  );
}
