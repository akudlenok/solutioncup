import { FC } from 'react';
import PageTitle from 'components/PageTitle/PageTitle';
import { MONTHS } from 'constants/month';

const ExpensesPage: FC = (): JSX.Element => {
  const pageTitle = `Расходы за ${MONTHS[new Date().getMonth() + 1]}`;
  return (
    <PageTitle title={pageTitle} />
  );
};


export default ExpensesPage;
