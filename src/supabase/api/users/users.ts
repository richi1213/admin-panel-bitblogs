import { UpdateEmailPayload, User } from '@/supabase/api/users/types';
import { supabase } from '@/supabase/auth-client';

export const fetchAllUsers = async (): Promise<User[] | null> => {
  const { data, error } = await supabase.auth.admin.listUsers();

  if (error) {
    console.error('Error fetching users:', error.message);
    return null;
  }

  const users = data?.users || [];

  return users as User[];
};

export const updateUserEmail = async ({
  userId,
  newEmail,
}: UpdateEmailPayload) => {
  const { data, error } = await supabase.auth.admin.updateUserById(userId, {
    email: newEmail,
  });

  if (error) {
    console.error('Error updating user email:', error);
    throw new Error('Failed to update user email');
  }

  return data;
};
