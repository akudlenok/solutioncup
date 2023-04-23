import { commonApi } from 'services/commonApi';
import { IExpense } from 'types/model/IExpense';
import { IExpenseFormFields } from 'types/form/IExpenseFromFields';
import { IGetAllExpensesRequest } from 'types/request/IGetAllExpensesRequest';

const BASE_URL = 'expenses';

export const expensesService = commonApi.injectEndpoints({
  endpoints: builder => ({
    getExpenses: builder.query<IExpense[], IGetAllExpensesRequest>({
      query: params => {
        return {
          url: BASE_URL,
          method: 'GET',
          params: {
            ...params,
            _expand: 'category',
          },
        };
      },
      providesTags: result =>
        result
          ? [...result?.map(({ id }) => ({ type: 'Expenses', id } as const)), { type: 'Expenses', id: 'LIST' }]
          : [{ type: 'Expenses', id: 'LIST' }],
    }),
    addExpense: builder.mutation<IExpense, IExpenseFormFields>({
      query: body => {
        return {
          url: BASE_URL,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: [{ type: 'Expenses', id: 'LIST' }],
    }),
    editExpense: builder.mutation<
      IExpense,
      {
        id: number;
        data: IExpenseFormFields;
      }
    >({
      query: ({ id, data: body }) => {
        return {
          url: `${BASE_URL}/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: [{ type: 'Expenses', id: 'LIST' }],
    }),
    deleteExpense: builder.mutation<null, number>({
      query: id => {
        return {
          url: `${BASE_URL}/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: [{ type: 'Expenses', id: 'LIST' }],
    }),
  }),
});

export const { useGetExpensesQuery, useAddExpenseMutation, useEditExpenseMutation, useDeleteExpenseMutation } =
  expensesService;
