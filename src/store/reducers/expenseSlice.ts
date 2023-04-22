import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IExpenseState } from 'types/state/IExpenseState';
import { IExpense } from 'types/model/IExpense';
import { IExpenseFormFields } from 'types/form/IExpenseFromFields';

const initialState: IExpenseState = {
  items: [],
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

export default expenseSlice.reducer;
