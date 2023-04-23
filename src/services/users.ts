import { commonApi } from 'services/commonApi';
import { IUser } from 'types/model/IUser';

export const usersService = commonApi.injectEndpoints({
  endpoints: builder => ({
    getProfile: builder.query<IUser, void | null>({
      query: () => {
        return {
          url: 'profile',
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useGetProfileQuery } = usersService;
