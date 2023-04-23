import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'types/model/IUser';
import { AuthState } from 'types/state/IAuthState';
import { deleteAccessToken, getAccessToken, saveAccessToken } from 'utils/localStorage';
import { usersService } from 'services/users';

const initialState: AuthState = {
  user: {} as IUser,
  token: getAccessToken() || '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state: AuthState, { payload }: PayloadAction<Omit<AuthState, 'user'>>) {
      state.token = payload.token;
      saveAccessToken(payload.token);
    },
    logout(state: AuthState) {
      state.user = {} as IUser;
      state.token = '';
      deleteAccessToken();
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      usersService.endpoints.getProfile.matchFulfilled,
      (state: AuthState, { payload }: PayloadAction<IUser>) => {
        state.user = payload;
        state.token = getAccessToken() as string;
      },
    );
  },
});

export default authSlice.reducer;
