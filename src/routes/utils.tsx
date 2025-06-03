import type { FC, PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { localStorageService } from 'utils/localStorageService';
import { EAppRoutes } from './config';

export const PreventLoggedInAccess: FC<PropsWithChildren> = ({ children }) => {
  const isLoggedIn = localStorageService.getAccessToken();

  return isLoggedIn ? <Navigate to={EAppRoutes.TASKS} /> : children;
};

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const isLoggedIn = localStorageService.getAccessToken();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to={EAppRoutes.LOGIN} state={{ from: location }} />;
  }

  return children;
};
