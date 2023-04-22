import { ICategory } from 'types/model/ICategory';

export interface IExpense {
  id: number,
  date: string,
  categoryId: number,
  category: ICategory,
  total: number
}
