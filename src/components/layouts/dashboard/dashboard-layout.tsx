import { BlogProvider, TagProvider } from '@/context';
import { DASHBOARD_PATHS } from '@/routes';
import { Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';

const { Content, Sider } = Layout;

export const DashboardLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ background: colorBgContainer }}>
      <Layout
        style={{
          padding: '24px 0',
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Sider style={{ background: colorBgContainer }} width={200}>
          <Menu
            mode='inline'
            style={{ height: '100%' }}
            items={[
              {
                key: 'users',
                label: 'Users',
                children: [
                  {
                    key: 'users-0',
                    label: <Link to='/'>Users</Link>,
                  },
                  {
                    key: 'users-1',
                    label: (
                      <Link to={DASHBOARD_PATHS.CREATE_USER}>Create User</Link>
                    ),
                  },
                ],
              },
              {
                key: 'blogs',
                label: 'Blogs',
                children: [
                  {
                    key: 'blogs-0',
                    label: <Link to={DASHBOARD_PATHS.BLOGS}>Blogs</Link>,
                  },
                  {
                    key: 'blogs-1',
                    label: (
                      <Link to={DASHBOARD_PATHS.CREATE_BLOG}>Create Blog</Link>
                    ),
                  },
                ],
              },
            ]}
          />
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: '80vh' }}>
          <BlogProvider>
            <TagProvider>
              <Outlet />
            </TagProvider>
          </BlogProvider>
        </Content>
      </Layout>
    </Layout>
  );
};
