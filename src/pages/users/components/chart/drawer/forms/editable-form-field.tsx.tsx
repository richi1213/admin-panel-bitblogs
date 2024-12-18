import React, { useState } from 'react';
import { Form, Input, Space } from 'antd';
import { CheckOutlined, EditOutlined } from '@ant-design/icons';
import { EditableFormFieldProps } from '@/pages/users/components/chart/drawer/forms/types';

export const EditableFormField: React.FC<EditableFormFieldProps> = ({
  fieldName,
  initialValue,
  onSubmit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCheckClick = () => {
    form.submit();
    setIsEditing(false);
  };

  const handleSubmit = (values: any) => {
    onSubmit(fieldName, values[fieldName]);
  };

  return (
    <Form
      form={form}
      initialValues={{ [fieldName]: initialValue }}
      onFinish={handleSubmit}
    >
      <Form.Item label={fieldName} name={fieldName}>
        <Space className='w-full' align='center'>
          <Input
            readOnly={!isEditing}
            className='flex-1'
            defaultValue={initialValue}
          />
          {!isEditing ? (
            <EditOutlined onClick={handleEditClick} />
          ) : (
            <CheckOutlined onClick={handleCheckClick} />
          )}
        </Space>
      </Form.Item>
    </Form>
  );
};
