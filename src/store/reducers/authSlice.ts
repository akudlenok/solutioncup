import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'types/model/IUser';
import { AuthState } from 'types/state/IAuthState';
import { deleteAccessToken, getAccessToken, saveAccessToken } from 'utils/localStorage';
import { authUser } from 'constants/fakeData';

const initialState: AuthState = {
  user: authUser,
  token: getAccessToken() || '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state: AuthState, { payload }: PayloadAction<AuthState>) {
      state.user = payload.user;
      state.token = payload.token;
      saveAccessToken(payload.token);
    },
    logout(state: AuthState) {
      state.user = {} as IUser;
      state.token = '';
      deleteAccessToken();
    },
  },
});

export default authSlice.reducer;
