import { FC } from 'react';
import { IModal } from 'types/global/IModal';
import Modal from 'components/Modal/Modal';
import ExpenseForm from 'components/Expenses/Form/ExpenseForm';
import { IExpenseFormFields } from 'types/form/IExpenseFromFields';
import { useAddExpenseMutation } from 'services/expenses';

interface ModalCreateCategoryProps extends IModal {}

const ModalCreateExpense: FC<ModalCreateCategoryProps> = ({ open, onClose }): JSX.Element => {
  const [createExpense] = useAddExpenseMutation();
  const onSubmit = (data: IExpenseFormFields): void => {
    createExpense({
      ...data,
    })
      .unwrap()
      .then(resp => {
        onClose();
      })
      .catch(err => {});
  };

  return (
    <Modal title='Добавление расхода' open={open} onClose={onClose}>
      <ExpenseForm onSubmit={onSubmit} />
    </Modal>
  );
};
export default ModalCreateExpense;
