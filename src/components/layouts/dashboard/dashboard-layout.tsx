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
                    key: '0',
                    label: <Link to='/'>Users</Link>,
                  },
                  {
                    key: '1',
                    label: <Link to='create-user'>Create User</Link>,
                  },
                ],
              },
            ]}
          />
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: '80vh' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
