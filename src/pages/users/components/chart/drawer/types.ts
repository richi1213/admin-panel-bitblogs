import { UserInChart } from '@/pages/users/components/chart/types';

export type UserDrawerProps = {
  open: boolean;
  currentUser: UserInChart | null;
  onClose: () => void;
  onDelete: () => void;
  onBan: () => void;
};
