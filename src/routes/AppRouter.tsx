import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { EAppRoutes } from './config';
import { Loader } from 'components/Loader';
import NotFound from 'pages/NotFoundPage/NotFoundPage';
import { ClippedLayout, MainLayout } from 'layouts';
import { PreventLoggedInAccess, ProtectedRoute } from './utils';
import TasksPage from 'pages/TasksPage/TasksPage';
import PreviewPage from 'pages/PreviewPage/PreviewPage';

const TasksDetailsPage = lazy(
  () => import('pages/TasksDetailsPage/TasksDetailsPage'),
);
const ProfilePage = lazy(() => import('pages/ProfilePage/ProfilePage'));
const LoginPage = lazy(() => import('pages/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('pages/RegisterPage/RegisterPage'));
const KanbanPage = lazy(() => import('pages/KanbanPage/KanbanPage'));

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
        path: EAppRoutes.PROFILE,
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <ProfilePage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: EAppRoutes.KANBAN,
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <KanbanPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    element: <ClippedLayout />,
    children: [
      {
        path: EAppRoutes.PREVIEW,
        element: <PreviewPage />,
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
