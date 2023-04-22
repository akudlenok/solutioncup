import React, { FC, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import { privateRouters, publicRouters } from 'router/index';
import { authUser } from 'constants/fakeData';
import { useAppDispatch } from 'hooks/redux';
import { authSlice } from 'store/reducers/authSlice';
import Loading from 'components/Loading/Loading';
import { endpoints } from 'constants/endpoints';

const App: FC = (): JSX.Element => {
  const { isAuth, user } = useAuth();
  const dispatch = useAppDispatch();
  const { login } = authSlice.actions;

  useEffect(() => {
    isAuth && dispatch(login({ user: authUser, token: 'token' }));
  }, [isAuth]);
  const router = createBrowserRouter(isAuth ? privateRouters : publicRouters);
  return !user.id && window.location.pathname !== endpoints.login.url ? (
    <div className='flex items-center justify-center h-screen'>
      <Loading />
    </div>
  ) : (
    <RouterProvider router={router} />
  );
};

export default App;
