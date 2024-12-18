export type EditBlogModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (title_en: string | null, description_en: string | null) => void;
  title: string | null;
  description: string | null;
};
