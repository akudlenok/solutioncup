import { FC } from 'react';
import Modal from 'components/Modal/Modal';
import { IModal } from 'types/global/IModal';
import { IExpense } from 'types/model/IExpense';
import ExpenseForm from 'components/Expenses/Form/ExpenseForm';
import { useEditExpenseMutation } from 'services/expenses';
import { IExpenseFormFields } from 'types/form/IExpenseFromFields';

interface ModalUpdateExpenseProps extends IModal {
  expense: IExpense;
}

const ModalUpdateExpense: FC<ModalUpdateExpenseProps> = ({ open, onClose, expense }): JSX.Element => {
  const [update] = useEditExpenseMutation();
  const onSubmit = (data: IExpenseFormFields): void => {
    update({
      id: expense.id,
      data,
    })
      .unwrap()
      .then(resp => {
        onClose();
      })
      .catch(err => {});
  };

  return (
    <Modal title='Редактирование расхода' open={open} onClose={onClose}>
      <ExpenseForm expense={expense} onSubmit={onSubmit} />
    </Modal>
  );
};

export default ModalUpdateExpense;
