import { BlogsPage, CreateBlogPage, CreateUserPage, UsersPage } from '@/pages';
import { DASHBOARD_PATHS } from '@/routes/layouts/dashboard/dashboard-routes/enums';

import { Route } from 'react-router-dom';

export const DASHBOARD_ROUTES = [
  <Route index element={<UsersPage />} />,
  <Route path={DASHBOARD_PATHS.CREATE_USER} element={<CreateUserPage />} />,
  <Route path={DASHBOARD_PATHS.BLOGS} element={<BlogsPage />} />,
  <Route path={DASHBOARD_PATHS.CREATE_BLOG} element={<CreateBlogPage />} />,
];
