import { Layout, Menu, MenuProps, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';

const { Content, Sider } = Layout;

const items2: MenuProps['items'] = [
  {
    key: `users`,
    label: `Users`,
    children: [
      {
        key: 0,
        label: <Link to='test'>Users</Link>,
      },
    ],
  },
];

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
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
            items={items2}
          />
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: '80vh' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
