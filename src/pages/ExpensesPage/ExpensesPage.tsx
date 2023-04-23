import { FC, useEffect, useState } from 'react';
import PageTitle from 'components/PageTitle/PageTitle';
import { MONTHS } from 'constants/month';
import { Button, Card, CardBody, Progress, Tooltip, Typography } from '@material-tailwind/react';
import { isWhatPercentOf } from 'utils/isWhatPercentOf';
import { color } from '@material-tailwind/react/types/components/progress';
import { getCurrentMonth } from 'utils/getCurrentMonth';
import { ICategory, IPopularCategory } from 'types/model/ICategory';
import { useCheckPermission } from 'hooks/useCheckPermission';
import { PERMISSIONS } from 'constants/permissions';
import useToggle from 'hooks/useToggle';
import ModalCreateExpense from 'components/Expenses/Modal/ModalCreateExpense';
import SelectMonth from 'components/SelectMonth/SelectMonth';
import { Link } from 'react-router-dom';
import { endpoints } from 'constants/endpoints';
import { getFormatDate } from 'utils/getFormatDate';
import { getStartAndEndOfMonth } from 'utils/getStartAndEndOfMonth';
import { useGetCategoriesQuery, useGetLimitCategoriesQuery } from 'services/categories';
import { useGetExpensesQuery } from 'services/expenses';

interface IItems extends ICategory {
  limit: number;
  total: number;
}

const ExpensesPage: FC = (): JSX.Element => {
  const [isShowModal, toggleShowModal] = useToggle(false);
  const [popularCategories, setPopularCategories] = useState<IPopularCategory[]>([]);
  const currentMonth = getCurrentMonth();
  const isCanCreateExpense = useCheckPermission(PERMISSIONS.EXPENSE.CREATE);
  const [selectMonthId, setSelectMonthId] = useState(currentMonth);
  const pageTitle = `Расходы за ${MONTHS[selectMonthId]}`;
  const [startDate, setStartDate] = useState<string>(getFormatDate(getStartAndEndOfMonth(currentMonth)[0]));
  const [endDate, setEndDate] = useState<string>(getFormatDate(getStartAndEndOfMonth(currentMonth)[1]));
  const { data: categories, isFetching: isCategoriesFetching } = useGetCategoriesQuery({});
  const { data: expenses, isFetching } = useGetExpensesQuery({
    date_gte: startDate,
    date_lte: endDate,
  });
  const { data: limitCategories, isFetching: isLimitCategoriesFetching } = useGetLimitCategoriesQuery({
    month: selectMonthId,
  });

  const [total, setTotal] = useState<number>(0);
  const [items, setItems] = useState<IItems[]>([]);

  const getColorProgress = (percent: number): color => {
    if (percent > 100) {
      return 'red';
    }

    if (percent > 70 && percent <= 100) {
      return 'green';
    }

    return 'blue';
  };

  useEffect(() => {
    setStartDate(getFormatDate(getStartAndEndOfMonth(selectMonthId)[0]));
    setEndDate(getFormatDate(getStartAndEndOfMonth(selectMonthId)[1]));
  }, [selectMonthId]);

  useEffect(() => {
    if (!categories) {
      setItems([]);
      return;
    }

    const result: IItems[] = [];
    categories.forEach(category => {
      const item: IItems = {
        ...category,
        total: 0,
        limit: 0,
      };

      item.total = (expenses || [])
        .filter(expense => expense.categoryId === category.id)
        .map(expense => +expense.total)
        .reduce((sum: number, num: number) => sum + num, 0);
      setTotal(prev => prev + item.total);
      const limit = (limitCategories || []).find(limit => limit.categoryId === category.id);
      item.limit = limit ? limit.limit : 0;
      result.push(item);
    });

    setItems(result);
  }, [categories, expenses, limitCategories]);

  return (
    <>
      <div className='flex justify-between items-center'>
        <PageTitle title={pageTitle} />
        <div className='w-56'>
          <SelectMonth selectMonthId={selectMonthId} setSelectMonthId={setSelectMonthId} />
        </div>
      </div>
      <div className='grid gap-x-4 gap-y-4 lg:grid-cols-3 sm:grid-cols-1'>
        {items.length ? (
          items.map(item => {
            const percent = isWhatPercentOf(item.total, item.limit);
            return (
              <Link to={`${endpoints.history.url}?month=${selectMonthId}&categoryId=${item.id}`} key={item.id}>
                <Card className='w-full' key={item.id}>
                  <CardBody className='text-center'>
                    <Typography variant='h5' className='mb-2'>
                      {item.name}
                    </Typography>
                    <Tooltip
                      placement='bottom'
                      content={`Потрачено: ${item.total} руб. Установленный лимит: ${item.limit} руб.`}
                    >
                      <Progress value={percent} color={getColorProgress(percent)} label='Израсходовано' />
                    </Tooltip>
                  </CardBody>
                </Card>
              </Link>
            );
          })
        ) : (
          <div>В данном месяце расходов не было</div>
        )}
      </div>
      {isCanCreateExpense && (
        <div className='fixed bottom-10 right-10'>
          <Tooltip placement='left' content='Добавить расход'>
            <Button size='md' className='h-10' disabled={isShowModal} onClick={toggleShowModal}>
              +
            </Button>
          </Tooltip>
        </div>
      )}
      {isCanCreateExpense && <ModalCreateExpense open={isShowModal} onClose={toggleShowModal} />}
    </>
  );
};
export default ExpensesPage;
