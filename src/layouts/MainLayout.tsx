import React, { FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'hooks/redux';
import { authSlice } from 'store/reducers/authSlice';
import { endpoints } from 'constants/endpoints';
import { commonApi } from 'services/commonApi';
import { Button } from '@material-tailwind/react';

const MainLayout: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { logout } = authSlice.actions;
  const logoutHandler = () => {
    dispatch(logout());
    dispatch(commonApi.util.resetApiState());
    navigate(endpoints.login.url);
  };

  return (
    <div className='flex h-screen justify-center items-center'>
      <Button onClick={logoutHandler}>Выйти</Button>
      <Outlet />
    </div>
  );
};

export default MainLayout;
