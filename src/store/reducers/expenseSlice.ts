import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IExpenseState } from 'types/state/IExpenseState';
import { IExpense } from 'types/model/IExpense';
import { IExpenseFormFields } from 'types/form/IExpenseFromFields';
import { RootState } from 'store/store';
import { expense } from 'constants/fakeData';

const initialState: IExpenseState = {
  items: expense,
};

export const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    add(state: IExpenseState, { payload }: PayloadAction<IExpense>) {

      state.items = [...state.items, payload];
    },
    delete(state: IExpenseState, { payload }: PayloadAction<number>) {
      state.items = state.items.filter(category => category.id != payload);
    },
    update(state: IExpenseState, { payload }: PayloadAction<{
      id: number,
      data: IExpenseFormFields
    }>) {

    },
  },
});

export const getExpenses = (page: number, limit: number) => (store: RootState): IExpense[] => {
  return store.expense.items;
};
export default expenseSlice.reducer;
