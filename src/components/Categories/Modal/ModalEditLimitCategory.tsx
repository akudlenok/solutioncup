import { IModal } from 'types/global/IModal';
import { ICategory, ILimitCategory } from 'types/model/ICategory';
import { FC } from 'react';
import Modal from 'components/Modal/Modal';
import LimitCategoryForm from 'components/Categories/Form/LimitCategoryForm';
import { useUpdateLimitCategoryMutation } from 'services/categories';
import { ILimitCategoryFormFields } from 'types/form/ILimitCategoryFormFields';

interface ModalEditLimitCategoryProps extends IModal {
  limit: ILimitCategory;
  categories: ICategory[];
}

const ModalEditLimitCategory: FC<ModalEditLimitCategoryProps> = ({ limit, onClose, open, categories }) => {
  const [update] = useUpdateLimitCategoryMutation();
  const onSubmit = (data: ILimitCategoryFormFields): void => {
    update({
      id: limit.id as number,
      data,
    })
      .unwrap()
      .then(resp => {
        onClose();
      })
      .catch(err => {});
  };
  return (
    <Modal title='Редактирование лимита категории' open={open} onClose={onClose}>
      <LimitCategoryForm limit={limit} categories={categories} onSubmit={onSubmit} />
    </Modal>
  );
};

export default ModalEditLimitCategory;
