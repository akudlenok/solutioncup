import { IUser } from 'types/model/IUser';

export interface AuthState {
  user: IUser;
  token: string;
}
