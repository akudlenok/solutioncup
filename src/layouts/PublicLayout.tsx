import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

const PublicLayout: FC = (): JSX.Element => {
  return (
    <div className='flex h-screen justify-center items-center'>
      <Outlet />
    </div>
  );
};

export default PublicLayout;
