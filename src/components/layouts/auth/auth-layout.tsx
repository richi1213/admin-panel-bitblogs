import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

export const AuthLayout: React.FC = () => {
  return (
    <Content className='mx-auto w-full max-w-[400px]'>
      <Outlet />
    </Content>
  );
};
