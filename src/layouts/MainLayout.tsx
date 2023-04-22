import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from 'components/Header/Header';

const MainLayout: FC = (): JSX.Element => {
  return (
    <div className='w-full min-h-screen'>
      <Header />
      <main className='container m-auto p-6'>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
