import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import {
  DefaultLayout,
  AuthLayout,
  DashboardLayout,
} from '../components/layouts';
import { LoginPage } from '@/pages/login';
import { NotFound } from '@/pages';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<DefaultLayout />}>
        <Route path='/' element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
        </Route>

        <Route path='/dashboard' element={<DashboardLayout />}></Route>
      </Route>

      <Route path='*' element={<NotFound />} />
    </>,
  ),
);
