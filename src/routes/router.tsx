import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* <Route element={<Layout />}></Route>

      <Route path='*' element={<NotFound />} /> */}
    </>,
  ),
);
