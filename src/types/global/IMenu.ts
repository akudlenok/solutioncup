import { IEndpoint } from 'types/global/IEndpoint';

export interface IMenu extends IEndpoint {
  permissions: string[],
}
