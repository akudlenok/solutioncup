import { IUser } from 'types/model/IUser';
import { ICategory } from 'types/model/ICategory';
import { generateRandomString } from 'utils/generateRandomString';
import { PERMISSIONS } from 'constants/permissions';

export const authUser: IUser = {
  id: generateRandomString(),
  lastName: 'Иванов',
  firstName: 'Иван',
  middleName: 'Иванович',
  permissions: [
    PERMISSIONS.CATEGORIES.CREATE,
    PERMISSIONS.CATEGORIES.UPDATE,
    PERMISSIONS.CATEGORIES.DELETE,
    PERMISSIONS.CATEGORIES.READ,
  ],
};

const AUTO_CATEGORY_ID = 1;
const COSMETIC_CATEGORY_ID = 2;
const HOBBY_CATEGORY_ID = 3;
const CLOTHING_CATEGORY_ID = 4;
const PRODUCTS_CATEGORY_ID = 5;
const RENTAL_PROPERTY_CATEGORY_ID = 6;
const EDUCATION_CATEGORY_ID = 7;

export const categories: ICategory[] = [
  {
    id: AUTO_CATEGORY_ID,
    name: 'Автомобиль',
  },
  {
    id: COSMETIC_CATEGORY_ID,
    name: 'Косметика',
  },
  {
    id: HOBBY_CATEGORY_ID,
    name: 'Хобби',
  },
  {
    id: CLOTHING_CATEGORY_ID,
    name: 'Одежда',
  },
  {
    id: PRODUCTS_CATEGORY_ID,
    name: 'Продукты',
  },
  {
    id: RENTAL_PROPERTY_CATEGORY_ID,
    name: 'Аренда недвижимости',
  },
  {
    id: EDUCATION_CATEGORY_ID,
    name: 'Образование',
  },
];
