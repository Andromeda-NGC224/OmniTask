import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { EAppRoutes } from './config';
import { MainLayout } from 'components/MainLayout';
import { Loader } from 'components/Loader';
import NotFound from 'pages/NotFoundPage/NotFoundPage';

const TasksPage = lazy(() => import('pages/TasksPage/TasksPage'));
const TestPage = lazy(() => import('pages/TestPage/TestPage'));
const LoginPage = lazy(() => import('pages/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('pages/RegisterPage/RegisterPage'));

const APP_ROUTES: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: EAppRoutes.TASKS,
        element: (
          <Suspense fallback={<Loader />}>
            <TasksPage />
          </Suspense>
        ),
      },
      {
        path: EAppRoutes.TEST_PAGE,
        element: (
          <Suspense fallback={<Loader />}>
            <TestPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: EAppRoutes.LOGIN,
    element: (
      <Suspense fallback={<Loader />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: EAppRoutes.REGISTER,
    element: (
      <Suspense fallback={<Loader />}>
        <RegisterPage />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export const appRouter = createBrowserRouter(APP_ROUTES);
