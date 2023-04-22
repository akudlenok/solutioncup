import { FC } from 'react';
import { IModal } from 'types/global/IModal';
import Modal from 'components/Modal/Modal';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import ExpenseForm from 'components/Expenses/Form/ExpenseForm';
import { IExpenseFormFields } from 'types/form/IExpenseFromFields';


interface ModalCreateCategoryProps extends IModal {
}

const ModalCreateExpense: FC<ModalCreateCategoryProps> = ({ open, onClose }): JSX.Element => {
    const dispatch = useAppDispatch();
    const onSubmit = (data: IExpenseFormFields): void => {
      onClose();
    };

    return (
      <Modal
        title='Добавление расхода'
        open={open}
        onClose={onClose}>
        <ExpenseForm
          onSubmit={onSubmit}
        />
      </Modal>
    );
  }
;

export default ModalCreateExpense;
