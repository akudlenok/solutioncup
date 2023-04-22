import { IUser } from 'types/model/IUser';
import { ICategory } from 'types/model/ICategory';
import { generateRandomString } from 'utils/generateRandomString';

export const authUser: IUser = {
  id: generateRandomString(),
  lastName: 'Иванов',
  firstName: 'Иван',
  middleName: 'Иванович',
};

export const categories: ICategory[] = [
  {
    id: 1,
    name: 'Автомобиль',
  },
  {
    id: 2,
    name: 'Косметика',
  },
  {
    id: 3,
    name: 'Хобби',
  },
  {
    id: 4,
    name: 'Одежда',
  },
  {
    id: 5,
    name: 'Продукты',
  },
  {
    id: 6,
    name: 'Аренда недвижимости',
  },
  {
    id: 7,
    name: 'Образование',
  },
];
