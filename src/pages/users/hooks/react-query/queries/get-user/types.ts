import { User } from '@/supabase';
import { UseQueryOptions } from '@tanstack/react-query';

export type UseGetUserProps<T> = {
  userId: string;
  queryOptions?: Omit<UseQueryOptions<User, any, T>, 'queryKey'>;
};
