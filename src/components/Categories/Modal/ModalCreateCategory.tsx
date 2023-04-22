import { FC } from 'react';
import { ICategoryFormFields } from 'types/form/IRoleFormFields';
import { IModal } from 'types/global/IModal';
import CategoryForm from 'components/Categories/Form/CategoryForm';
import Modal from 'components/Modal/Modal';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { categorySlice, getAllCompanies, getCompanies } from 'store/reducers/categorySlice';


interface ModalCreateCategoryProps extends IModal {
}

const ModalCreateCategory: FC<ModalCreateCategoryProps> = ({ open, onClose }): JSX.Element => {
    const dispatch = useAppDispatch();
    const { add } = categorySlice.actions;
    const categories = useAppSelector(
      getAllCompanies(),
    );
    const onSubmit = (data: ICategoryFormFields): void => {
      dispatch(add({
        id: categories.length + 1,
        ...data,
      }));
      onClose();
    };

    return (
      <Modal
        title='Создание новой категории'
        open={open}
        onClose={onClose}>
        <CategoryForm
          onSubmit={onSubmit}
        />
      </Modal>
    );
  }
;

export default ModalCreateCategory;
