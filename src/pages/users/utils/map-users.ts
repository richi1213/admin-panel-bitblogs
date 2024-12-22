import { User } from '@/supabase/api/users/types';
import { formatDate } from '@/utils';

export const mapUsersForChart = (users: User[]) =>
  users?.map((user) => ({
    id: user.id,
    createdAt: formatDate(user.created_at),
    fullNameEn: user.user_metadata?.full_name_en,
    userName: user.user_metadata?.username,
    email: user.email,
    lastSignIn: formatDate(user.last_sign_in_at),
  }));

export const getUserInfoForDrawer = (user: User) => {
  return {
    fullNameEn: user?.user_metadata.full_name_en,
    fullNameKa: user?.user_metadata.full_name_ka,
    userName: user?.user_metadata.username,
    email: user?.email,
    phone: user?.phone,
    confirmedAt: user?.confirmed_at,
    lastSignedIn: user?.last_sign_in_at,
  };
};
