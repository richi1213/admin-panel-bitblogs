import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { DefaultLayout } from '@/components/layouts';
import { NotFound } from '@/pages';
import { IsUnauthorizedGuard, IsAuthorizedGuard } from '@/routes/protected';
import { AUTH_LAYOUT, DASHBOARD_LAYOUT } from '@/routes/layouts';

export const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<DefaultLayout />}>
        <Route element={<IsAuthorizedGuard />}>{AUTH_LAYOUT}</Route>
        <Route element={<IsUnauthorizedGuard />}>{DASHBOARD_LAYOUT}</Route>
      </Route>
      <Route path='*' element={<NotFound />} />
    </>,
  ),
);
