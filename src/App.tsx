import React, { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import { privateRouters, publicRouters } from 'router/index';
import Loading from 'components/Loading/Loading';
import { useGetProfileQuery } from 'services/users';

const App: FC = (): JSX.Element => {
  const { isAuth } = useAuth();
  const { isLoading } = useGetProfileQuery(null, { skip: !isAuth });
  const router = createBrowserRouter(isAuth ? privateRouters : publicRouters);
  return isLoading ? (
    <div className='flex items-center justify-center h-screen'>
      <Loading />
    </div>
  ) : (
    <RouterProvider router={router} />
  );
};

export default App;
