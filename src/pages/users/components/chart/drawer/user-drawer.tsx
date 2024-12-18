import React from 'react';
import { Drawer, Button, Form, Input, Space, Spin } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { EditableFormField } from '@/pages/users/components/chart/drawer/forms';
import { UserDrawerProps } from '@/pages/users/components/chart/drawer/types';
import { useUserData } from '@/pages/users/hooks';

export const UserDrawer: React.FC<UserDrawerProps> = ({
  open,
  userId,
  onClose,
}) => {
  const {
    user,
    isLoading,
    updateEmail,
    updateFullNameEn,
    updateFullNameKa,
    updateUsername,
    deleteUserById,
  } = useUserData(userId);

  const initialValues = {
    fullNameEn: user?.user_metadata.full_name_en || '',
    fullNameKa: user?.user_metadata.full_name_ka || '',
    userName: user?.user_metadata.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
    confirmedAt: user?.confirmed_at || '',
    lastSignedIn: user?.last_sign_in_at || '',
  };

  if (isLoading) {
    return <Spin />;
  }

  const handleFieldSubmit = (fieldName: string, value: string) => {
    switch (fieldName) {
      case 'email':
        updateEmail(value);
        break;
      case 'fullNameEn':
        updateFullNameEn(value);
        break;
      case 'fullNameKa':
        updateFullNameKa(value);
        break;
      case 'userName':
        updateUsername(value);
        break;
      default:
        break;
    }
  };

  return (
    <Drawer title='Edit User' open={open} onClose={onClose} width={400}>
      <EditableFormField
        fieldName='fullNameEn'
        initialValue={initialValues.fullNameEn}
        onSubmit={handleFieldSubmit}
      />
      <EditableFormField
        fieldName='fullNameKa'
        initialValue={initialValues.fullNameKa}
        onSubmit={handleFieldSubmit}
      />
      <EditableFormField
        fieldName='userName'
        initialValue={initialValues.userName}
        onSubmit={handleFieldSubmit}
      />
      <EditableFormField
        fieldName='email'
        initialValue={initialValues.email}
        onSubmit={handleFieldSubmit}
      />

      <Form.Item label='Phone'>
        <Input value={initialValues.phone} readOnly />
      </Form.Item>

      <Form.Item label='Confirmed At'>
        <Input value={initialValues.confirmedAt} readOnly />
      </Form.Item>

      <Form.Item label='Last Sign-In'>
        <Input value={initialValues.lastSignedIn} readOnly />
      </Form.Item>

      <Space direction='vertical'>
        <Button
          type='primary'
          danger
          icon={<DeleteOutlined />}
          onClick={() => deleteUserById()}
        >
          Delete User
        </Button>
        {/* <Button
          type='primary'
          danger
          icon={<StopOutlined />}
          onClick={() => console.log('Ban User')}
        >
          Ban User
        </Button> */}
      </Space>
    </Drawer>
  );
};
