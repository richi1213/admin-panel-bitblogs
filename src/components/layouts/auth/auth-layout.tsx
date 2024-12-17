import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

export const AuthLayout: React.FC = () => {
  return (
    <Layout className='h-screen items-center justify-center'>
      <Content className='w-full max-w-[400px]'>
        <Outlet />
      </Content>
    </Layout>
  );
};
