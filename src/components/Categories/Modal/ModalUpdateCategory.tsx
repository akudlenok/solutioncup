import { FC } from 'react';
import { ICategory } from 'types/model/ICategory';
import Modal from 'components/Modal/Modal';
import { IModal } from 'types/global/IModal';
import CategoryForm from 'components/Categories/Form/CategoryForm';
import { ICategoryFormFields } from 'types/form/ICategoryFormFields';
import { useUpdateCategoryMutation } from 'services/categories';

interface ModalUpdateCategoryProps extends IModal {
  category: ICategory;
}

const ModalUpdateCategory: FC<ModalUpdateCategoryProps> = ({ open, onClose, category }): JSX.Element => {
  const [update] = useUpdateCategoryMutation();
  const onSubmit = (data: ICategoryFormFields): void => {
    update({
      id: category.id,
      data,
    })
      .unwrap()
      .then(resp => {
        onClose();
      })
      .catch(err => {});
  };

  return (
    <Modal title='Редактирование категории' open={open} onClose={onClose}>
      <CategoryForm category={category} onSubmit={onSubmit} />
    </Modal>
  );
};

export default ModalUpdateCategory;
