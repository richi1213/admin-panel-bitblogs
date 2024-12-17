import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

export const App: React.FC = () => <RouterProvider router={router} />;
