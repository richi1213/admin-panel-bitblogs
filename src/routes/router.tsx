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
import {
  LoginPage,
  UsersPage,
  CreateUserPage,
  BlogsPage,
  NotFound,
  CreateBlogPage,
} from '@/pages';
import { IsUnauthorizedGuard, IsAuthorizedGuard } from '@/routes/protected';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<DefaultLayout />}>
        <Route element={<IsAuthorizedGuard />}>
          <Route path='/' element={<AuthLayout />}>
            <Route index element={<LoginPage />} />
          </Route>
        </Route>

        <Route element={<IsUnauthorizedGuard />}>
          <Route path='dashboard' element={<DashboardLayout />}>
            <Route index element={<UsersPage />}></Route>
            <Route path='create-user' element={<CreateUserPage />}></Route>
            <Route path='blogs' element={<BlogsPage />}></Route>
            <Route path='create-blog' element={<CreateBlogPage />}></Route>
          </Route>
        </Route>
      </Route>

      <Route path='*' element={<NotFound />} />
    </>,
  ),
);
