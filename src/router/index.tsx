import { Navigate, RouteObject } from 'react-router-dom';
import MainLayout from 'layouts/MainLayout';
import PublicLayout from 'layouts/PublicLayout';
import { endpoints } from 'constants/endpoints';
import LoginPage from 'pages/LoginPage/LoginPage';
import ExpensesPage from 'pages/ExpensesPage/ExpensesPage';
import CategoriesPage from 'pages/CategoriesPage/CategoriesPage';

const navigateTo = (fromPath: string, toPath: string) => {
  return {
    path: fromPath,
    element: <Navigate to={toPath} replace />,
  };
};

export const privateRouters: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      navigateTo(endpoints.login.url, endpoints.expenses.url),
      navigateTo(endpoints.base.url, endpoints.expenses.url),
      {
        path: endpoints.expenses.url,
        element: <ExpensesPage />,
      },
      {
        path: endpoints.categories.url,
        element: <CategoriesPage />,
      },
    ],
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
