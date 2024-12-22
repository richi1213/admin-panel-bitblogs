import { Drawer, Button, Form, Input, Space, Spin } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { EditableFormField } from '@/pages/users/components/chart/drawer/forms';
import { UserDrawerProps } from '@/pages/users/components/chart/drawer/types';
import {
  getUserInfoForDrawer,
  handleUserFieldSubmit,
} from '@/pages/users/utils';
import { useGetUser, useUserDelete, useUserUpdate } from '@/pages/users/hooks';

export const UserDrawer: React.FC<UserDrawerProps> = ({
  open,
  userId,
  onClose,
}) => {
  const { data: user, isLoading } = useGetUser({
    userId,
    queryOptions: { select: getUserInfoForDrawer },
  });

  const { updateEmail, updateFullNameEn, updateFullNameKa, updateUsername } =
    useUserUpdate(userId);

  const { deleteUserById } = useUserDelete(userId);

  if (isLoading) <Spin />;

  const updateFunctions = {
    updateEmail,
    updateFullNameEn,
    updateFullNameKa,
    updateUsername,
  };

  return (
    <Drawer title='Edit User' open={open} onClose={onClose} width={400}>
      <EditableFormField
        fieldName='fullNameEn'
        initialValue={user?.fullNameEn}
        onSubmit={(fieldName, value) =>
          handleUserFieldSubmit(fieldName, value, updateFunctions)
        }
      />
      <EditableFormField
        fieldName='fullNameKa'
        initialValue={user?.fullNameKa}
        onSubmit={(fieldName, value) =>
          handleUserFieldSubmit(fieldName, value, updateFunctions)
        }
      />
      <EditableFormField
        fieldName='userName'
        initialValue={user?.userName}
        onSubmit={(fieldName, value) =>
          handleUserFieldSubmit(fieldName, value, updateFunctions)
        }
      />
      <EditableFormField
        fieldName='email'
        initialValue={user?.email}
        onSubmit={(fieldName, value) =>
          handleUserFieldSubmit(fieldName, value, updateFunctions)
        }
      />

      <Form.Item label='Phone'>
        <Input value={user?.phone} readOnly />
      </Form.Item>

      <Form.Item label='Confirmed At'>
        <Input value={user?.confirmedAt} readOnly />
      </Form.Item>

      <Form.Item label='Last Sign-In'>
        <Input value={user?.lastSignedIn} readOnly />
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
      </Space>
    </Drawer>
  );
};
