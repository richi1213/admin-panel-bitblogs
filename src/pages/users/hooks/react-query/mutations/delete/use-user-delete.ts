import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { deleteUser } from '@/supabase';
import {
  USER_QUERY_KEYS,
  USERS_QUERY_KEYS,
} from '@/pages/users/hooks/react-query/queries';

export const useUserDelete = (userId: string) => {
  const queryClient = useQueryClient();

  const { mutate: deleteUserById } = useMutation({
    mutationKey: [USER_QUERY_KEYS.USER, userId],
    mutationFn: () => deleteUser(userId),
    onSuccess: () => {
      notification.success({
        message: 'User deleted successfully!',
        duration: 2,
      });
      queryClient.invalidateQueries({
        queryKey: [USER_QUERY_KEYS.USER, userId],
      });
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEYS.USERS] });
    },
    onError: () => {
      notification.error({
        message: 'Error deleting user',
        description: 'An error occurred while deleting the user',
        duration: 2,
      });
    },
  });

  return {
    deleteUserById,
  };
};
