import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Input, Typography } from '@material-tailwind/react';
import { endpoints } from 'constants/endpoints';
import { useAppDispatch } from 'hooks/redux';
import { authSlice } from 'store/reducers/authSlice';
import { LoginRequest } from 'types/request/LoginRequest';
import { useLoginMutation } from 'services/auth';

const LoginPage: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { login } = authSlice.actions;
  const [loginBack, { data, isSuccess: isSuccessAuth, isLoading: isFetchingAuth }] = useLoginMutation();
  const [formData, setFormData] = useState<LoginRequest>({
    login: 'admin',
    password: 'admin',
  });

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isDisabledBtn = !formData.login.trim() || !formData.password.trim() || isFetchingAuth;

  const enterHandler = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter' && !isDisabledBtn) {
      return loginHandler();
    }
  };

  useEffect(() => {
    if (!isSuccessAuth || !data) {
      return;
    }

    dispatch(login({ token: data.access_token }));
    navigate(endpoints.base.url);
  }, [isSuccessAuth, data]);

  const loginHandler = () => {
    dispatch(login({ token: 'token' }));
    navigate(endpoints.base.url);
  };

  return (
    <div className='w-full p-10 m-auto bg-white rounded-md shadow-xl shadow-blue-300/40 ring ring-2 ring-blue-300 lg:max-w-xl'>
      <Card color='transparent' shadow={false} className='text-center'>
        <Typography variant='h4' color='blue-gray'>
          Войдите в свой аккаунт
        </Typography>
        <form className='m-auto mt-8 mb-2 w-80 max-w-screen-lg sm:w-96' onKeyUp={enterHandler}>
          <div className='mb-4 flex flex-col gap-6'>
            <Input name='login' size='lg' label='Логин' value={formData.login} onChange={inputChangeHandler} />
            <Input
              name='password'
              type='password'
              size='lg'
              label='Пароль'
              value={formData.password}
              onChange={inputChangeHandler}
            />
          </div>
          <Button className='mt-6' fullWidth disabled={isDisabledBtn} onClick={loginHandler}>
            Войти
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
