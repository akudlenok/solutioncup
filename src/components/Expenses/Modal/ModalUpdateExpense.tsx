import { FC } from 'react';
import { ICategory } from 'types/model/ICategory';
import Modal from 'components/Modal/Modal';
import { IModal } from 'types/global/IModal';
import CategoryForm from 'components/Categories/Form/CategoryForm';
import { ICategoryFormFields } from 'types/form/IRoleFormFields';
import { useAppDispatch } from 'hooks/redux';
import { categorySlice } from 'store/reducers/categorySlice';

interface ModalUpdateCategoryProps extends IModal {
  category: ICategory;
}

const ModalUpdateExpense: FC<ModalUpdateCategoryProps> = ({ open, onClose, category }): JSX.Element => {
  const dispatch = useAppDispatch();
  const { update } = categorySlice.actions;
  const onSubmit = (data: ICategoryFormFields): void => {
    dispatch(update({
      id: category.id,
      data,
    }));
    onClose();
  };

  return (
    <Modal
      title='Редактирование категории'
      open={open}
      onClose={onClose}>
      <CategoryForm
        category={category}
        onSubmit={onSubmit}
      />
    </Modal>
  );
};

export default ModalUpdateExpense;
