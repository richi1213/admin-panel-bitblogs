import { LoginPage } from '@/pages';
import { Route } from 'react-router-dom';

export const AUTH_ROUTES = [
  <Route key='login' index element={<LoginPage />} />,
];
