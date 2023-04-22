import { ICategory } from 'types/model/ICategory';

export interface IExpense {
  id: number,
  date: string,
  name: string,
  categoryId: number,
  category: ICategory,
  total: number
}
