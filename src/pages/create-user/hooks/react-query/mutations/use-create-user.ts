import { USERS_QUERY_KEYS } from '@/pages/users';
import { DASHBOARD_LAYOUT_PATH } from '@/routes';
import { CreateUserPayload, createUser } from '@/supabase';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: [USERS_QUERY_KEYS.USERS],
    mutationFn: (newUserData: CreateUserPayload) => createUser(newUserData),
    onSuccess: () => {
      notification.success({
        message: 'User created successfully!',
        duration: 2,
      });
      navigate(`/${DASHBOARD_LAYOUT_PATH.DASHBOARD}`);
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEYS.USERS] });
    },
    onError: () => {
      notification.error({
        message: 'Error creating user',
        description: 'An error occurred while creating the user',
        duration: 2,
      });
    },
  });

  return { mutate, isPending };
};
