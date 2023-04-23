import { FC } from 'react';
import { IModal } from 'types/global/IModal';
import Modal from 'components/Modal/Modal';
import { useAddLimitCategoryMutation } from 'services/categories';
import LimitCategoryForm from 'components/Categories/Form/LimitCategoryForm';
import { ICategory, ILimitCategory } from 'types/model/ICategory';
import { ILimitCategoryFormFields } from 'types/form/ILimitCategoryFormFields';

interface ModalCreateLimitCategoryProps extends IModal {
  limit: ILimitCategory;
  categories: ICategory[];
}

const ModalCreateLimitCategory: FC<ModalCreateLimitCategoryProps> = ({
  open,
  onClose,
  limit,
  categories,
}): JSX.Element => {
  const [creteLimitCategory] = useAddLimitCategoryMutation();
  const onSubmit = (data: ILimitCategoryFormFields): void => {
    creteLimitCategory({
      ...data,
    })
      .unwrap()
      .then(resp => {
        onClose();
      })
      .catch(err => {});
  };

  return (
    <Modal title='Добавление лимита категории' open={open} onClose={onClose}>
      <LimitCategoryForm limit={limit} categories={categories} onSubmit={onSubmit} />
    </Modal>
  );
};
export default ModalCreateLimitCategory;
