import { ILimitCategory } from 'types/model/ICategory';

export interface ILimitCategoryFormFields extends Omit<ILimitCategory, 'id | category'> {}
