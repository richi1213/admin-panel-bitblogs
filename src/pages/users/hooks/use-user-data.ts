import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import {
  fetchUserById,
  updateUserEmail,
  updateUserFullNameEn,
  updateUserFullNameKa,
  updateUserUsername,
} from '@/supabase';

export const useUserData = (userId: string) => {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUserById(userId),
    staleTime: 2 * 60 * 1000,
    enabled: !!userId,
  });

  const { mutate: updateEmail } = useMutation({
    mutationKey: ['user', userId],
    mutationFn: (newField: string) => updateUserEmail({ userId, newField }),
    onSuccess: () =>
      notification.success({
        message: 'Email updated successfully!',
        duration: 2,
      }),
    onError: () =>
      notification.error({
        message: 'Error updating email',
        description: 'An error occurred while updating email',
        duration: 2,
      }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const { mutate: updateFullNameEn } = useMutation({
    mutationKey: ['user', userId],
    mutationFn: (newField: string) =>
      updateUserFullNameEn({ userId, newField }),
    onSuccess: () =>
      notification.success({
        message: 'Full name en updated successfully!',
        duration: 2,
      }),
    onError: () =>
      notification.error({
        message: 'Error updating full name en',
        description: 'An error occurred while updating full name en',
        duration: 2,
      }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const { mutate: updateFullNameKa } = useMutation({
    mutationKey: ['user', userId],
    mutationFn: (newField: string) =>
      updateUserFullNameKa({ userId, newField }),
    onSuccess: () =>
      notification.success({
        message: 'Full name ka updated successfully!',
        duration: 2,
      }),
    onError: () =>
      notification.error({
        message: 'Error updating full name ka',
        description: 'An error occurred while updating full name ka',
        duration: 2,
      }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const { mutate: updateUsername } = useMutation({
    mutationKey: ['user', userId],
    mutationFn: (newField: string) => updateUserUsername({ userId, newField }),
    onSuccess: () =>
      notification.success({
        message: 'Username updated successfully!',
        duration: 2,
      }),
    onError: () =>
      notification.error({
        message: 'Error updating username',
        description: 'An error occurred while updating username',
        duration: 2,
      }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return {
    user,
    isLoading,
    updateEmail,
    updateFullNameEn,
    updateFullNameKa,
    updateUsername,
  };
};
