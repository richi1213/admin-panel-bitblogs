import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { AuthLayout, DashboardLayout } from '../components/layouts';
import { NotFound } from '../pages';
import { LoginPage } from '@/pages/login';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<AuthLayout />}>
        <Route path='login' element={<LoginPage />} />
      </Route>

      {/* <Route element={<AuthGuard />}> */}
      <Route path='/dashboard' element={<DashboardLayout />}>
        {/* <Route path='users' element={<UsersTable />} />
          <Route path='blogs' element={<BlogsTable />} /> */}
      </Route>
      {/* </Route> */}

      {/* Catch-all Not Found Route */}
      <Route path='*' element={<NotFound />} />
    </>,
  ),
);
