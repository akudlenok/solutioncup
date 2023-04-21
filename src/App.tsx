import React, { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import { privateRouters, publicRouters } from 'router/index';

const App: FC = (): JSX.Element => {
  const { isAuth } = useAuth();
  const router = createBrowserRouter(isAuth ? privateRouters : publicRouters);
  return (
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>
  );
};

export default App;
