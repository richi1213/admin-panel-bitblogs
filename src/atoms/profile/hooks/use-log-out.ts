import { useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { userAtom } from '../user-atom';
import { supabase } from '../../../supabase';

const useLogOut: () => { logout: () => Promise<void> } = () => {
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      setUser((prev) => ({ ...prev, isLoading: true }));

      await supabase.auth.signOut();

      localStorage.removeItem('user-session');

      setUser({
        isLoading: false,
        isLoggedIn: false,
        userInfo: null,
      });

      notification.success({
        message: 'Logged out successfully!',
        description: 'You have been logged out.',
        duration: 2,
      });

      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);

      setUser((prev) => ({ ...prev, isLoading: false }));

      notification.error({
        message: 'Logout Error',
        description: 'An error occurred while logging out.',
        duration: 2,
      });
    }
  };

  return { logout };
};

export default useLogOut;
