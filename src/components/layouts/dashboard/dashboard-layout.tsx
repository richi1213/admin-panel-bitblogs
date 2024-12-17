import { Layout, Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

export const DashboardLayout: React.FC = () => {
  return (
    <Layout className='min-h-screen'>
      <Sider>
        <Menu theme='dark' mode='inline'>
          <Menu.Item key='users'>
            <Link to='/dashboard/users'>Users</Link>
          </Menu.Item>
          <Menu.Item key='blogs'>
            <Link to='/dashboard/blogs'>Blogs</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className='bg-slate-200 text-center'>Admin Panel</Header>
        <Content className='bg- m-4 bg-slate-200 p-4'>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
Layout;
