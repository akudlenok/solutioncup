import { FC, useState } from 'react';
import { useCheckPermission } from 'hooks/useCheckPermission';
import { PERMISSIONS } from 'constants/permissions';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid';
import { Button } from '@material-tailwind/react';
import useToggle from 'hooks/useToggle';
import { useAppDispatch } from 'hooks/redux';
import { IExpense } from 'types/model/IExpense';
import { expenseSlice } from 'store/reducers/expenseSlice';

interface ExpensesTableProps {
  expenses: IExpense[];
}

const ExpensesTable: FC<ExpensesTableProps> = ({ expenses }): JSX.Element => {
  const dispatch = useAppDispatch();
  const isCanEditExpense = useCheckPermission(PERMISSIONS.EXPENSE.UPDATE);
  const isCanDeleteExpense = useCheckPermission(PERMISSIONS.EXPENSE.DELETE);
  const [isShowModal, toggleShowModal] = useToggle(false);
  const [updateExpense, setUpdateExpense] = useState<IExpense | null>(null);
  const { delete: deleteAction } = expenseSlice.actions;

  const onUpdateClick = (expense: IExpense) => {
    setUpdateExpense(expense);
    toggleShowModal();
  };

  const onDeleteClick = (expenseId: number) => {
    dispatch(deleteAction(expenseId));
  };

  return (
    <>
      <table className='min-w-full text-left text-sm font-light'>
        <thead className='border-b font-medium dark:border-neutral-500'>
          <tr>
            <th scope='col' className='px-6 py-4'>Дата расхода</th>
            <th scope='col' className='px-6 py-4'>Наименование расхода</th>
            <th scope='col' className='px-6 py-4'>Категория расхода</th>
            <th scope='col' className='px-6 py-4'>Сумма расхода</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map(expense => {
              return (
                <tr className='border-b dark:border-neutral-500'>
                  <td className='whitespace-nowrap px-6 py-4 font-medium'>{expense.date}</td>
                  <td className='whitespace-nowrap px-6 py-4'>{expense.name}</td>
                  <td className='whitespace-nowrap px-6 py-4'>{expense.category.name}</td>
                  <td className='whitespace-nowrap px-6 py-4'>{expense.total}</td>
                  <div className={!isCanEditExpense && !isCanDeleteExpense ? 'd-none' : 'flex gap-2 justify-end'}>
                    {isCanEditExpense &&
                      <Button
                        size='sm'
                        disabled={isShowModal}
                        onClick={() => onUpdateClick(expense)}
                      >
                        <PencilSquareIcon className='w-5 h-5' />
                      </Button>
                    }
                    {isCanDeleteExpense &&
                      <Button
                        size='sm'
                        color='red'
                        onClick={() => onDeleteClick(expense.id)}
                      >
                        <TrashIcon className='w-5 h-5' />
                      </Button>
                    }
                  </div>
                </tr>
              );
            })
          }
        </tbody>
      </table>
      {/*{isCanEditExpense &&*/}
      {/*  updateExpense &&*/}
      {/*}*/}
    </>
  );
};

export default ExpensesTable;
