import { FC, useState } from 'react';
import PageTitle from 'components/PageTitle/PageTitle';
import ExpensesTable from 'components/Expenses/Table/ExpensesTable';
import { useGetExpensesQuery } from 'services/expenses';
import Loading from 'components/Loading/Loading';
import { getCurrentMonth } from 'utils/getCurrentMonth';
import { getStartAndEndOfMonth } from 'utils/getStartAndEndOfMonth';
import { getFormatDate } from 'utils/getFormatDate';
import { Input, Option, Select } from '@material-tailwind/react';
import { useGetCategoriesQuery } from 'services/categories';
import { DEFAULT_SELECT_ID } from 'constants/filter';
import { useSearchParams } from 'react-router-dom';

const HistoryPage: FC = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentMonth = Number(searchParams.get('month') || getCurrentMonth());
  const [startDate, setStartDate] = useState<string>(getFormatDate(getStartAndEndOfMonth(currentMonth)[0]));
  const [endDate, setEndDate] = useState<string>(getFormatDate(getStartAndEndOfMonth(currentMonth)[1]));
  const [selectCategoryId, setSelectCategoryId] = useState<number>(
    Number(searchParams.get('categoryId') || DEFAULT_SELECT_ID),
  );
  const { data: categories, isFetching: isCategoriesFetching } = useGetCategoriesQuery({});
  const { data: expenses, isFetching } = useGetExpensesQuery({
    date_gte: startDate,
    date_lte: endDate,
    ...(selectCategoryId !== DEFAULT_SELECT_ID && {
      categoryId: selectCategoryId,
    }),
  });

  return (
    <>
      <PageTitle title='История расходов' />
      <div className='my-4 flex items-center gap-4'>
        <Input
          label='Начало периода'
          type='date'
          disabled={isFetching}
          value={startDate}
          onChange={event => setStartDate(event.target.value)}
        />
        <Input
          label='Конец периода'
          type='date'
          disabled={isFetching}
          value={endDate}
          onChange={event => setEndDate(event.target.value)}
        />
        {categories && categories.length && (
          <Select
            disabled={!categories || !categories?.length || isFetching || isCategoriesFetching}
            onChange={event => {
              setSelectCategoryId(Number(event));
            }}
            value={selectCategoryId !== DEFAULT_SELECT_ID ? String(selectCategoryId) : undefined}
            label='Категория расхода'
          >
            {categories?.map(category => {
              return (
                <Option value={String(category.id)} key={category.id}>
                  {category.name}
                </Option>
              );
            })}
          </Select>
        )}
      </div>
      {isFetching ? (
        <Loading />
      ) : expenses && expenses.length ? (
        <ExpensesTable expenses={expenses} />
      ) : (
        <div>Нет данных</div>
      )}
    </>
  );
};

export default HistoryPage;
