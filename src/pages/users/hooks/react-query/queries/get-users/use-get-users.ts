import { USERS_QUERY_KEYS } from '@/pages/users/hooks/react-query/queries/get-users/enums';
import { UseGetUsersProps } from '@/pages/users/hooks/react-query/queries/get-users/types';
import { fetchAllUsers, User } from '@/supabase';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const useGetUsers = <T>({
  queryOptions,
}: UseGetUsersProps<T>): UseQueryResult<T, any> => {
  return useQuery<User[], any, T>({
    queryKey: [USERS_QUERY_KEYS.USERS],
    queryFn: fetchAllUsers,
    ...queryOptions,
  });
};
