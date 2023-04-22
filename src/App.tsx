import React, { FC, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import { privateRouters, publicRouters } from 'router/index';
import { authUser } from 'constants/fakeData';
import { useAppDispatch } from 'hooks/redux';
import { authSlice } from 'store/reducers/authSlice';

const App: FC = (): JSX.Element => {
  const { isAuth } = useAuth();
  const dispatch = useAppDispatch();
  const { login } = authSlice.actions;

  useEffect(() => {
    isAuth && dispatch(login({ user: authUser, token: 'token' }));
  }, [isAuth]);
  const router = createBrowserRouter(isAuth ? privateRouters : publicRouters);
  return (
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>
  );
};

export default App;
