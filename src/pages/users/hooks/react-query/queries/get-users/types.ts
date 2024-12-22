import { User } from '@/supabase';
import { UseQueryOptions } from '@tanstack/react-query';

export type UseGetUsersProps<T> = {
  queryOptions?: Omit<UseQueryOptions<User[], any, T>, 'queryKey'>;
};
