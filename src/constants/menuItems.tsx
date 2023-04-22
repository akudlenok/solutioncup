import { endpoints } from './endpoints';
import { PERMISSIONS } from './permissions';
import { IMenu } from 'types/global/IMenu';

export const menuItems: IMenu[] = [
  {
    title: endpoints.expenses.title,
    to: endpoints.expenses.url,
    permissions: [],
    sort: 1,
  },
  {
    title: endpoints.categories.title,
    to: endpoints.categories.url,
    permissions: [PERMISSIONS.CATEGORIES.READ],
    sort: 2,
  },
];
