import { FC } from 'react';
import { ICategoryFormFields } from 'types/form/ICategoryFormFields';
import { IModal } from 'types/global/IModal';
import CategoryForm from 'components/Categories/Form/CategoryForm';
import Modal from 'components/Modal/Modal';
import { useAddCategoryMutation } from 'services/categories';

interface ModalCreateCategoryProps extends IModal {}

const ModalCreateCategory: FC<ModalCreateCategoryProps> = ({ open, onClose }): JSX.Element => {
  const [creteCategory] = useAddCategoryMutation();
  const onSubmit = (data: ICategoryFormFields): void => {
    creteCategory({
      ...data,
    })
      .unwrap()
      .then(resp => {
        onClose();
      })
      .catch(err => {});
  };

  return (
    <Modal title='Создание новой категории' open={open} onClose={onClose}>
      <CategoryForm onSubmit={onSubmit} />
    </Modal>
  );
};
export default ModalCreateCategory;
