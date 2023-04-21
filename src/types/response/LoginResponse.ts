import { IUser } from 'types/model/IUser';

export interface LoginResponse {
  user: IUser;
  access_token: string;
}
