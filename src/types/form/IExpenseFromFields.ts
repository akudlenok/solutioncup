import { IExpense } from 'types/model/IExpense';

export interface IExpenseFormFields extends Omit<IExpense, 'id | category'> {}
