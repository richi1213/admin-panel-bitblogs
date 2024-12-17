import { Header } from '@/components/layouts/default/components';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

export const DefaultLayout: React.FC = () => {
  return (
    <Layout>
      <Header />
      <Content style={{ padding: '0 48px' }}>
        <Outlet />
      </Content>
    </Layout>
  );
};
