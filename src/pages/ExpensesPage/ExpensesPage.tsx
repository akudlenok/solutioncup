import { FC, useEffect, useState } from 'react';
import PageTitle from 'components/PageTitle/PageTitle';
import { MONTH_IDS, MONTHS } from 'constants/month';
import { popularCategories as fakePopularCategory } from 'constants/fakeData';
import { Card, CardBody, Progress, Select, Typography, Option, Button } from '@material-tailwind/react';
import { isWhatPercentOf } from 'utils/isWhatPercentOf';
import { color } from '@material-tailwind/react/types/components/progress';
import { getCurrentMonth } from 'utils/getCurrentMonth';
import { IPopularCategory } from 'types/model/ICategory';
import { useCheckPermission } from 'hooks/useCheckPermission';
import { PERMISSIONS } from 'constants/permissions';
import useToggle from 'hooks/useToggle';
import ModalCreateExpense from 'components/Expenses/Modal/ModalCreateExpense';

const ExpensesPage: FC = (): JSX.Element => {
    const [isShowModal, toggleShowModal] = useToggle(false);
    const [popularCategories, setPopularCategories] = useState<IPopularCategory[]>([]);
    const currentMonth = getCurrentMonth();
    const isCanCreateExpense = useCheckPermission(PERMISSIONS.EXPENSE.CREATE);
    const [selectMonthId, setSelectMonthId] = useState(currentMonth);
    const pageTitle = `Расходы за ${MONTHS[new Date().getMonth() + 1]}`;
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
      setPopularCategories(fakePopularCategory.filter(item => item.month === selectMonthId));
    }, [selectMonthId]);


    return (
      <>
        <div className='flex justify-between items-center'>
          <PageTitle title={pageTitle} />
          {isCanCreateExpense &&
            <Button
              size='md'
              className='h-10'
              disabled={isShowModal}
              onClick={toggleShowModal}>
              Добавить расход
            </Button>
          }
        </div>
        <div className='grid gap-x-4 gap-y-4 lg:grid-cols-3 sm:grid-cols-1'>
          {
            popularCategories.map(popularCategory => {
              const percent = isWhatPercentOf(popularCategory.total, popularCategory.limit);
              return (
                <Card className='w-full' key={popularCategory.category.id}>
                  <CardBody className='text-center'>
                    <Typography variant='h5' className='mb-2'>
                      {popularCategory.category.name}
                    </Typography>
                    <Progress value={percent}
                              color={getColorProgress(percent)}
                              label='Израсходовано' />
                  </CardBody>
                </Card>
              );
            })
          }
        </div>
        {isCanCreateExpense && <ModalCreateExpense open={isShowModal} onClose={toggleShowModal} />}
      </>
    );
  }
;


export default ExpensesPage;
