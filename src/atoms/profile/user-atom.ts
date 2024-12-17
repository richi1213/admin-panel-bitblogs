import { ProfilesRow } from '@/supabase';
import { atomWithStorage } from 'jotai/utils';

export const userAtom = atomWithStorage<{
  isLoading?: boolean;
  isLoggedIn: boolean;
  userInfo: null | ProfilesRow;
}>('user-session', {
  isLoading: true,
  isLoggedIn: false,
  userInfo: null,
});
