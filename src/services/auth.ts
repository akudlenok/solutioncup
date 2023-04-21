import { commonApi } from 'services/commonApi';
import { LoginRequest } from 'types/request/LoginRequest';
import { LoginResponse } from 'types/response/LoginResponse';

export const authService = commonApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: credentials => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authService;
