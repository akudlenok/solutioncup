import { commonApi } from 'services/commonApi';
import { ICategory, ILimitCategory } from 'types/model/ICategory';
import { ICategoryFormFields } from 'types/form/ICategoryFormFields';
import { ILimitCategoryFormFields } from 'types/form/ILimitCategoryFormFields';

const BASE_URL = 'categories';
const BASE_LIMIT_URL = 'limitCategories';

export const categoriesService = commonApi.injectEndpoints({
  endpoints: builder => ({
    getCategories: builder.query<
      ICategory[],
      {
        page?: number;
        size?: number;
      }
    >({
      query: ({ page, size }) => {
        let url = BASE_URL;
        if (page && size) {
          url += `?_page=${page}&_limit=${size}`;
        }
        return {
          url,
          method: 'GET',
        };
      },
      providesTags: result =>
        result
          ? [...result?.map(({ id }) => ({ type: 'Categories', id } as const)), { type: 'Categories', id: 'LIST' }]
          : [{ type: 'Categories', id: 'LIST' }],
    }),
    addCategory: builder.mutation<ICategory, ICategoryFormFields>({
      query: body => {
        return {
          url: BASE_URL,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
    }),
    updateCategory: builder.mutation<
      ICategory,
      {
        id: number;
        data: ICategoryFormFields;
      }
    >({
      query: ({ id, data: body }) => {
        return {
          url: `${BASE_URL}/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
    }),
    deleteCategory: builder.mutation<null, number>({
      query: id => {
        return {
          url: `${BASE_URL}/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
    }),

    getLimitCategories: builder.query<
      ILimitCategory[],
      {
        month: number;
      }
    >({
      query: params => {
        return {
          url: BASE_LIMIT_URL,
          method: 'GET',
          params,
        };
      },
      providesTags: result =>
        result
          ? [...result?.map(({ id }) => ({ type: 'Categories', id } as const)), { type: 'LimitCategories', id: 'LIST' }]
          : [{ type: 'LimitCategories', id: 'LIST' }],
    }),
    addLimitCategory: builder.mutation<ILimitCategory, ILimitCategoryFormFields>({
      query: body => {
        return {
          url: BASE_LIMIT_URL,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: [{ type: 'LimitCategories', id: 'LIST' }],
    }),
    updateLimitCategory: builder.mutation<
      ILimitCategory,
      {
        id: number;
        data: ILimitCategoryFormFields;
      }
    >({
      query: ({ id, data: body }) => {
        return {
          url: `${BASE_LIMIT_URL}/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: [{ type: 'LimitCategories', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetLimitCategoriesQuery,
  useAddLimitCategoryMutation,
  useUpdateLimitCategoryMutation,
} = categoriesService;
