import { EditBlogModalProps } from '@/pages/blogs/components/blog-cards/blog-card/modal/types';
import { Modal, Input } from 'antd';
import { useState } from 'react';

const EditBlogModal: React.FC<EditBlogModalProps> = ({
  visible,
  onClose,
  onSave,
  title,
  description,
}) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const handleSave = () => {
    onSave(newTitle, newDescription);
  };

  return (
    <Modal
      title='Edit Blog'
      open={visible}
      onCancel={onClose}
      onOk={handleSave}
      okText='Save Changes'
    >
      <div className='space-y-4'>
        <div>
          <label>Title</label>
          <Input
            value={newTitle || ''}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <Input.TextArea
            value={newDescription || ''}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default EditBlogModal;
