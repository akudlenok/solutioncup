import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategoryState } from 'types/state/ICategoryState';
import { categories } from 'constants/fakeData';
import { ICategory } from 'types/model/ICategory';
import { RootState } from 'store/store';
import { ICategoryFormFields } from 'types/form/IRoleFormFields';

const initialState: ICategoryState = {
  items: categories,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    add(state: ICategoryState, { payload }: PayloadAction<ICategory>) {
      state.items = [...state.items, payload];
    },
    delete(state: ICategoryState, { payload }: PayloadAction<number>) {
      state.items = state.items.filter(category => category.id != payload);
    },
    update(state: ICategoryState, { payload }: PayloadAction<{
      id: number,
      data: ICategoryFormFields
    }>) {
      const category = state.items.find(category => category.id);
      state.items = state.items.map(item => {
        if (item.id === category?.id) {
          return {
            ...item,
            ...payload.data,
          };
        }

        return item;
      });
    },
  },
});

export const getAllCompanies = () => (store: RootState): ICategory[] => {
  return store.category.items;
};

export const getCompanies = (page: number, limit: number) => (store: RootState): ICategory[] => {
  return store.category.items;
};

export default categorySlice.reducer;
