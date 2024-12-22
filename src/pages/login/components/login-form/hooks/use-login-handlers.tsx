import { notification } from 'antd';
import { useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { userAtom } from '@/atoms';
import { fetchUserProfile, supabase } from '@/supabase';
import { DASHBOARD_LAYOUT_PATH } from '@/routes';

type UseLoginHandlers = {
  handleLoginSuccess: () => Promise<void>;
  handleLoginError: (err: unknown) => void;
};

const useLoginHandlers: () => UseLoginHandlers = () => {
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();

  const handleLoginSuccess: UseLoginHandlers['handleLoginSuccess'] =
    async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const profile = await fetchUserProfile(user.id);

          console.log('Logged in user:', user);

          if (!profile) {
            notification.error({
              message: 'Error',
              description: 'Could not fetch user profile.',
              duration: 2,
            });
            return;
          }

          setUser({
            isLoggedIn: true,
            userInfo: {
              email: user.email ?? null,
              username: profile.username || null,
              avatar_url: profile.avatar_url || null,
              full_name_en: profile.full_name_en || null,
              full_name_ka: profile.full_name_ka || null,
              id: profile.id,
              updated_at: profile.updated_at || null,
            },
          });

          notification.success({
            message: 'Success!',
            description: 'You have logged in successfully.',
            duration: 2,
          });

          navigate(`/${DASHBOARD_LAYOUT_PATH.DASHBOARD}`);
        }
      } catch (err) {
        console.error('Error handling login:', err);
        notification.error({
          message: 'Error',
          description: 'An error occurred while logging in.',
          duration: 2,
        });
      }
    };

  const handleLoginError: UseLoginHandlers['handleLoginError'] = (err) => {
    const errorMessage =
      (err as { message?: string })?.message || 'An unknown error occurred';
    notification.error({
      message: 'Uh oh! Something went wrong.',
      description: (
        <div className='flex items-center'>
          <ExclamationCircleOutlined className='mr-2' />
          <div>{errorMessage}</div>
        </div>
      ),
      duration: 2,
    });
  };

  return { handleLoginSuccess, handleLoginError };
};

export default useLoginHandlers;
