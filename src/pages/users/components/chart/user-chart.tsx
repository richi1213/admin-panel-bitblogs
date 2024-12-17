import { UserDrawer } from '@/pages/users/components/chart/drawer';
import { UserInChart } from '@/pages/users/components/chart/types';
import { fetchAllUsers } from '@/supabase';
import { formatDate } from '@/utils';
import { EditOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Table, Spin, Alert } from 'antd';
import { useState } from 'react';

const { Column } = Table;

export const UsersChart: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserInChart | null>(null);
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchAllUsers,
    staleTime: 10 * 60 * 1000,
  });

  const formattedUsers: UserInChart[] =
    users?.map((user) => ({
      id: user.id,
      createdAt: formatDate(user.created_at),
      fullNameEn: user.user_metadata?.full_name_en,
      userName: user.user_metadata?.username,
      email: user.email,
      lastSignIn: formatDate(user.last_sign_in_at),
    })) || [];

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <Alert message='Error fetching users' type='error' />;
  }

  const handleEdit = (user: UserInChart) => {
    setCurrentUser(user);
    setDrawerVisible(true);
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
    setCurrentUser(null);
  };

  const handleDelete = () => {
    if (currentUser) {
      console.log(`Deleting user with ID: ${currentUser.id}`);
      handleCloseDrawer();
    }
  };

  const handleBan = () => {
    if (currentUser) {
      console.log(`Banning user with ID: ${currentUser.id}`);
      handleCloseDrawer();
    }
  };

  return (
    <>
      <Table dataSource={formattedUsers} rowKey='id'>
        <Column<UserInChart>
          title='ID'
          dataIndex='id'
          key='id'
          ellipsis
          responsive={['lg']}
        />
        <Column<UserInChart>
          title='Created At'
          dataIndex='createdAt'
          key='createdAt'
          ellipsis
        />
        <Column<UserInChart>
          title='Full Name (EN)'
          dataIndex='fullNameEn'
          key='fullNameEn'
          ellipsis
        />
        <Column<UserInChart>
          title='Username'
          dataIndex='userName'
          key='userName'
          ellipsis
        />
        <Column<UserInChart>
          title='Email'
          dataIndex='email'
          key='email'
          ellipsis
        />
        <Column<UserInChart>
          title='Last Sign-In'
          dataIndex='lastSignIn'
          key='lastSignIn'
          ellipsis
        />
        <Column<UserInChart>
          title='Actions'
          key='actions'
          render={(_, record) => (
            <EditOutlined onClick={() => handleEdit(record)} />
          )}
        />
      </Table>

      <UserDrawer
        open={drawerVisible}
        currentUser={currentUser}
        onClose={handleCloseDrawer}
        onDelete={handleDelete}
        onBan={handleBan}
      />
    </>
  );
};
