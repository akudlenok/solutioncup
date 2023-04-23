import React, { FC, useEffect, useState } from 'react';
import { Button, IconButton, MobileNav, Navbar, Typography } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useAppDispatch } from 'hooks/redux';
import { useAuth } from 'hooks/useAuth';
import { authSlice } from 'store/reducers/authSlice';
import { commonApi } from 'services/commonApi';
import { endpoints } from 'constants/endpoints';
import { menuItems } from 'constants/menuItems';
import { useCheckPermission } from 'hooks/useCheckPermission';

const Header: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { logout } = authSlice.actions;
  const [openNav, setOpenNav] = useState<boolean>(false);

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(commonApi.util.resetApiState());
    navigate(endpoints.login.url);
  };

  const navList = (
    <ul className='mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6'>
      {menuItems
        .filter(item => (item.permissions.length ? useCheckPermission(item.permissions[0]) : true))
        .sort((a, b) => a.sort - b.sort)
        .map(item => (
          <Typography as='li' key={item.title} variant='small' color='blue-gray' className='p-1 font-normal'>
            <Link to={item.to} className='flex items-center'>
              {item.title}
            </Link>
          </Typography>
        ))}
    </ul>
  );

  useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  return (
    <Navbar className='sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4'>
      <div className='flex items-center justify-between text-blue-gray-900'>
        <Typography as='span' variant='small' className='mr-4 cursor-pointer py-1.5 font-normal'>
          Мои расходы
        </Typography>
        <div className='hidden lg:block'>{navList}</div>
        <div className='flex items-center justify-center gap-4 m-auto lg:m-0'>
          <Typography as='span' variant='small' color='blue-gray' className='p-1 font-normal'>
            {`${user.lastName} ${user.firstName[0]}. ${user.middleName[0]}.`}
          </Typography>
          <Button variant='gradient' size='sm' onClick={logoutHandler} className='hidden lg:inline-block'>
            <ArrowRightOnRectangleIcon className='w-5 h-6' />
          </Button>
        </div>
        <IconButton
          variant='text'
          className='h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              className='h-6 w-6'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16M4 18h16' />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className='container mx-auto'>
          {navList}
          <Button variant='gradient' size='sm' fullWidth className='mb-2' onClick={logoutHandler}>
            Выйти
          </Button>
        </div>
      </MobileNav>
    </Navbar>
  );
};

export default Header;
