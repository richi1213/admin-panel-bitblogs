import { DashboardLayout } from '@/components/layouts';
import { DASHBOARD_ROUTES } from '@/routes/layouts/dashboard/dashboard-routes';
import { DASHBOARD_LAYOUT_PATH } from '@/routes/layouts/dashboard/enums';
import { Route } from 'react-router-dom';

export const DASHBOARD_LAYOUT = (
  <Route path={DASHBOARD_LAYOUT_PATH.DASHBOARD} element={<DashboardLayout />}>
    {DASHBOARD_ROUTES}
  </Route>
);
