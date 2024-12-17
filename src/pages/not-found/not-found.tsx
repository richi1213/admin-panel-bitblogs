import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <div className='flex min-h-screen items-center px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16'>
      <div className='w-full space-y-6 text-center'>
        <div className='space-y-3'>
          <h1 className='animate-bounce text-5xl font-bold tracking-tighter sm:text-5xl'>
            404
          </h1>
          <p className='text-foreground'>
            Looks like you've ventured into the unknown digital realm.
          </p>
        </div>
        <Link
          to='/'
          className='bg-background text-foreground inline-flex h-10 items-center rounded-md px-8 text-sm font-medium shadow transition-colors hover:bg-gray-900/90 hover:text-white focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50'
        >
          Return to website
        </Link>
      </div>
    </div>
  );
};
