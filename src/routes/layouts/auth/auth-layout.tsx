import { AuthLayout } from '@/components/layouts';
import { AUTH_ROUTES } from '@/routes/layouts/auth/auth-routes';
import { Route } from 'react-router-dom';

export const AUTH_LAYOUT = (
  <Route element={<AuthLayout />}>{AUTH_ROUTES}</Route>
);
