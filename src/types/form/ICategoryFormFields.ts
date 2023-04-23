import { ICategory } from 'types/model/ICategory';

export interface ICategoryFormFields extends Omit<ICategory, 'id'> {}
