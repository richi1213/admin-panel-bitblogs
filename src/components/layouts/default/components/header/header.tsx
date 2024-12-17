import { userAtom } from '@/atoms';
import { UserMenu } from '@/components/layouts/default/components/ui';
import { Layout } from 'antd';
import { useAtomValue } from 'jotai';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  const user = useAtomValue(userAtom);

  return (
    <Layout.Header className='flex items-center justify-between border-b bg-blue-600 p-4 text-white'>
      <div className='container mx-auto flex items-center justify-between'>
        <div className='flex cursor-pointer items-center'>
          <Link to='/'>
            <span className='text-2xl font-bold hover:text-blue-300'>
              BitBlogs
            </span>
          </Link>
        </div>

        <div className='flex items-center space-x-4'>
          {user.isLoggedIn && (
            <UserMenu
              avatarUrl={user.userInfo?.avatar_url}
              name={user.userInfo?.full_name_en as string}
            />
          )}
        </div>
      </div>
    </Layout.Header>
  );
};
