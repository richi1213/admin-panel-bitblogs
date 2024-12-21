import { RouterProvider } from 'react-router-dom';
import { appRouter } from '@/routes';

export const App: React.FC = () => <RouterProvider router={appRouter} />;
