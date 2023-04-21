import { useMemo } from 'react';
import { useAppSelector } from 'hooks/redux';
import { AuthState } from 'types/state/IAuthState';

export const useAuth = () => {
  const { user, token }: AuthState = useAppSelector(state => state.auth);

  return useMemo(() => ({ user, isAuth: !!token.trim() }), [user, token]);
};
