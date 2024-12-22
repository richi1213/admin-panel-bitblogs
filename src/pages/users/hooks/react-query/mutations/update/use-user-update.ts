import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import {
  updateUserEmail,
  updateUserFullNameEn,
  updateUserFullNameKa,
  updateUserUsername,
} from '@/supabase';
import {
  USER_QUERY_KEYS,
  USERS_QUERY_KEYS,
} from '@/pages/users/hooks/react-query/queries';

export const useUserUpdate = (userId: string) => {
  const queryClient = useQueryClient();

  const { mutate: updateEmail } = useMutation({
    mutationKey: [USER_QUERY_KEYS.USER, userId],
    mutationFn: (newField: string) => updateUserEmail({ userId, newField }),
    onSuccess: () => {
      notification.success({
        message: 'Email updated successfully!',
        duration: 2,
      });
      queryClient.invalidateQueries({
        queryKey: [USER_QUERY_KEYS.USER, userId],
      });
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEYS.USERS] });
    },
    onError: () =>
      notification.error({
        message: 'Error updating email',
        description: 'An error occurred while updating email',
        duration: 2,
      }),
  });

  const { mutate: updateFullNameEn } = useMutation({
    mutationKey: [USER_QUERY_KEYS.USER, userId],
    mutationFn: (newField: string) =>
      updateUserFullNameEn({ userId, newField }),
    onSuccess: () => {
      notification.success({
        message: 'Full name en updated successfully!',
        duration: 2,
      });
      queryClient.invalidateQueries({
        queryKey: [USER_QUERY_KEYS.USER, userId],
      });
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEYS.USERS] });
    },
    onError: () =>
      notification.error({
        message: 'Error updating full name en',
        description: 'An error occurred while updating full name en',
        duration: 2,
      }),
  });

  const { mutate: updateFullNameKa } = useMutation({
    mutationKey: [USER_QUERY_KEYS.USER, userId],
    mutationFn: (newField: string) =>
      updateUserFullNameKa({ userId, newField }),
    onSuccess: () => {
      notification.success({
        message: 'Full name ka updated successfully!',
        duration: 2,
      });
      queryClient.invalidateQueries({
        queryKey: [USER_QUERY_KEYS.USER, userId],
      });
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEYS.USERS] });
    },
    onError: () =>
      notification.error({
        message: 'Error updating full name ka',
        description: 'An error occurred while updating full name ka',
        duration: 2,
      }),
  });

  const { mutate: updateUsername } = useMutation({
    mutationKey: [USER_QUERY_KEYS.USER, userId],
    mutationFn: (newField: string) => updateUserUsername({ userId, newField }),
    onSuccess: () => {
      notification.success({
        message: 'Username updated successfully!',
        duration: 2,
      });
      queryClient.invalidateQueries({
        queryKey: [USER_QUERY_KEYS.USER, userId],
      });
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEYS.USERS] });
    },
    onError: () =>
      notification.error({
        message: 'Error updating username',
        description: 'An error occurred while updating username',
        duration: 2,
      }),
  });

  return {
    updateEmail,
    updateFullNameEn,
    updateFullNameKa,
    updateUsername,
  };
};
