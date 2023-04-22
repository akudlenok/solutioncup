import { FC } from 'react';
import PageTitle from 'components/PageTitle/PageTitle';
import useToggle from 'hooks/useToggle';
import { useAppSelector } from 'hooks/redux';
import ExpensesTable from 'components/Expenses/Table/ExpensesTable';
import { getExpenses } from 'store/reducers/expenseSlice';

const HistoryPage: FC = (): JSX.Element => {
  const [isShowModal, toggleShowModal] = useToggle(false);
  const expenses = useAppSelector(
    getExpenses(1, 10),
  );
  return (
    <>
      <PageTitle title='История расходов' />
      <ExpensesTable expenses={expenses} />
    </>
  );
};


export default HistoryPage;
