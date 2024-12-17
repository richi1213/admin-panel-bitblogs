import { Form, Input, Button, Space, Drawer } from 'antd';
import { DeleteOutlined, StopOutlined } from '@ant-design/icons';
import { UserDrawerProps } from '@/pages/users/components/chart/drawer/types';

export const UserDrawer: React.FC<UserDrawerProps> = ({
  open,
  currentUser,
  onClose,
  onDelete,
  onBan,
}) => {
  if (!currentUser) return null;

  return (
    <Drawer title='Edit User' open={open} onClose={onClose} width={400}>
      <Form
        initialValues={{
          fullNameEn: currentUser.fullNameEn,
          userName: currentUser.userName,
          email: currentUser.email,
        }}
      >
        <Form.Item
          label='Full Name'
          name='fullNameEn'
          rules={[{ required: true, message: 'Please enter full name' }]}
        >
          <Input prefix={<i className='anticon anticon-user' />} />
        </Form.Item>

        <Form.Item
          label='Username'
          name='userName'
          rules={[{ required: true, message: 'Please enter username' }]}
        >
          <Input prefix={<i className='anticon anticon-user' />} />
        </Form.Item>

        <Form.Item
          label='Email'
          name='email'
          rules={[{ required: true, message: 'Please enter email' }]}
        >
          <Input prefix={<i className='anticon anticon-mail' />} />
        </Form.Item>

        <Form.Item
          label='Last Sign-In'
          name='lastSignIn'
          initialValue={currentUser.lastSignIn}
        >
          <Input disabled />
        </Form.Item>

        <Space direction='vertical'>
          <Button
            type='primary'
            danger
            icon={<DeleteOutlined />}
            onClick={onDelete}
          >
            Delete User
          </Button>
          <Button type='primary' danger icon={<StopOutlined />} onClick={onBan}>
            Ban User
          </Button>
        </Space>
      </Form>
    </Drawer>
  );
};
