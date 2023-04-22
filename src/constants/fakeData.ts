import { IUser } from 'types/model/IUser';
import { ICategory, IPopularCategory } from 'types/model/ICategory';
import { generateRandomString } from 'utils/generateRandomString';
import { PERMISSIONS } from 'constants/permissions';
import { getRandomNumber } from 'utils/getRandomNumber';
import { MONTH_IDS } from 'constants/month';
import { getCurrentMonth } from 'utils/getCurrentMonth';
import { IExpense } from 'types/model/IExpense';

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
    PERMISSIONS.EXPENSE.UPDATE,
    PERMISSIONS.EXPENSE.DELETE,
    PERMISSIONS.EXPENSE.READ,
    PERMISSIONS.EXPENSE.CREATE,
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

const getCategoryById = (id: number): ICategory => {
  return categories.find(category => category.id === id) as ICategory;
};

const currentMonth = getCurrentMonth();
const useMonths = MONTH_IDS.filter(id => id <= currentMonth);

const generatePopularCategories = (startMonth: number, endMonth: number): IPopularCategory[] => {
  let popular: IPopularCategory[] = [];
  const useMonths = MONTH_IDS.filter(id => id >= startMonth && id <= endMonth);
  useMonths.forEach(month => {
    popular = [...popular, ...categories.map(category => {
      return {
        category,
        total: getRandomNumber(1000, 1500),
        limit: getRandomNumber(1000, 1500),
        month,
      };
    })];
  });
  return popular;
};
export const popularCategories: IPopularCategory[] = generatePopularCategories(1, currentMonth);

export const expense: IExpense[] = [
  {
    id: 1,
    name: 'Бензин',
    date: '20-04-2023',
    total: 500,
    categoryId: AUTO_CATEGORY_ID,
    category: getCategoryById(AUTO_CATEGORY_ID),
  },
];
