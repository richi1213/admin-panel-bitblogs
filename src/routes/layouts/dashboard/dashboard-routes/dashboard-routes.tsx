import { BlogsPage, CreateBlogPage, CreateUserPage, UsersPage } from '@/pages';
import { DASHBOARD_PATHS } from '@/routes/layouts/dashboard/dashboard-routes/enums';

import { Route } from 'react-router-dom';

export const DASHBOARD_ROUTES = [
  <Route key='users' index element={<UsersPage />} />,
  <Route
    key={DASHBOARD_PATHS.CREATE_USER}
    path={DASHBOARD_PATHS.CREATE_USER}
    element={<CreateUserPage />}
  />,
  <Route
    key={DASHBOARD_PATHS.BLOGS}
    path={DASHBOARD_PATHS.BLOGS}
    element={<BlogsPage />}
  />,
  <Route
    key={DASHBOARD_PATHS.CREATE_BLOG}
    path={DASHBOARD_PATHS.CREATE_BLOG}
    element={<CreateBlogPage />}
  />,
];
