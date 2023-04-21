import { Navigate, RouteObject } from 'react-router-dom';
import MainLayout from 'layouts/MainLayout';
import PublicLayout from 'layouts/PublicLayout';
import { endpoints } from 'constants/endpoints';
import LoginPage from 'pages/LoginPage/LoginPage';

const navigateTo = (fromPath: string, toPath: string) => {
  return {
    path: fromPath,
    element: <Navigate to={toPath} replace />,
  };
};

export const privateRouters: RouteObject[] = [
  {
    path: endpoints.base.url,
    element: <MainLayout />,
    children: [],
  },
];

export const publicRouters: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: endpoints.login.url,
        element: <LoginPage />,
      },
      navigateTo('*', endpoints.login.url),
    ],
  },
];
