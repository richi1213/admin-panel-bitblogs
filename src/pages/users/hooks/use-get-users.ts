import { fetchAllUsers } from '@/supabase';
import { User } from '@/supabase/api/users/types';
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';

type UseGetUsersProps<T> = {
  queryOptions?: Omit<UseQueryOptions<User[], any, T>, 'queryKey'>;
};

export const useGetUsers = <T>({
  queryOptions,
}: UseGetUsersProps<T> = {}): UseQueryResult<T, any> => {
  return useQuery<User[], any, T>({
    queryKey: ['users'],
    queryFn: fetchAllUsers,
    ...queryOptions,
  });
};
