import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { EAppRoutes } from './config';
import { Loader } from 'components/Loader';
import NotFound from 'pages/NotFoundPage/NotFoundPage';
import { ClippedLayout, MainLayout } from 'layouts';

const TasksPage = lazy(() => import('pages/TasksPage/TasksPage'));
const TasksDetailsPage = lazy(
  () => import('pages/TasksDetailsPage/TasksDetailsPage'),
);
const TestPage = lazy(() => import('pages/TestPage/TestPage'));
const LoginPage = lazy(() => import('pages/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('pages/RegisterPage/RegisterPage'));
const PreviewPage = lazy(() => import('pages/PreviewPage/PreviewPage'));

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
        path: EAppRoutes.TASKS_DETAILS,
        element: (
          <Suspense fallback={<Loader />}>
            <TasksDetailsPage />
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
    element: <ClippedLayout />,
    children: [
      {
        path: EAppRoutes.PREVIEW,
        element: (
          <Suspense fallback={<Loader />}>
            <PreviewPage />
          </Suspense>
        ),
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
    ],
  },
];

export const appRouter = createBrowserRouter(APP_ROUTES);
