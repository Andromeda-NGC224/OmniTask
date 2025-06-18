import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { EAppRoutes } from './config';
import { Loader } from 'components/Loader';
import NotFound from 'pages/NotFoundPage/NotFoundPage';
import { ClippedLayout, MainLayout } from 'layouts';
import { PreventLoggedInAccess, ProtectedRoute } from './utils';

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
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <TasksPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: EAppRoutes.TASKS_DETAILS,
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <TasksDetailsPage />
            </Suspense>
          </ProtectedRoute>
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
          <PreventLoggedInAccess>
            <Suspense fallback={<Loader />}>
              <LoginPage />
            </Suspense>
          </PreventLoggedInAccess>
        ),
      },
      {
        path: EAppRoutes.REGISTER,
        element: (
          <PreventLoggedInAccess>
            <Suspense fallback={<Loader />}>
              <RegisterPage />
            </Suspense>
          </PreventLoggedInAccess>
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
