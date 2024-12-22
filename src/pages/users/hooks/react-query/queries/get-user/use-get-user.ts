import { USER_QUERY_KEYS } from '@/pages/users/hooks/react-query/queries/get-user/enums';
import { UseGetUserProps } from '@/pages/users/hooks/react-query/queries/get-user/types';
import { fetchUserById, User } from '@/supabase';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const useGetUser = <T>({
  userId,
  queryOptions,
}: UseGetUserProps<T>): UseQueryResult<T, any> => {
  return useQuery<User, any, T>({
    queryKey: [USER_QUERY_KEYS.USER, userId],
    queryFn: () => fetchUserById(userId),
    staleTime: 2 * 60 * 1000,
    enabled: !!userId,
    ...queryOptions,
  });
};
