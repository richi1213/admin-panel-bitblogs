import useLogOut from '@/atoms/profile/hooks/use-log-out';
import { Button, Dropdown, Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { ProfileAvatarProps } from '@/components/layouts/default/components/ui/user-menu/types';
import { ProfileAvatar } from '@/components/layouts/default/components/ui/user-menu/profile-avatar';

export const UserMenu: React.FC<ProfileAvatarProps> = ({ avatarUrl, name }) => {
  const { logout } = useLogOut();

  // Define the menu
  const menu = (
    <Menu>
      <Menu.Item key='signout' className='text-red-600' onClick={logout}>
        <LogoutOutlined className='mr-2 h-4 w-4' />
        Sign out
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      trigger={['click']}
      placement='bottomRight'
      dropdownRender={() => menu}
    >
      <Button className='relative h-8 w-8 rounded-full'>
        <ProfileAvatar avatarUrl={avatarUrl} name={name} />
      </Button>
    </Dropdown>
  );
};

export default UserMenu;
