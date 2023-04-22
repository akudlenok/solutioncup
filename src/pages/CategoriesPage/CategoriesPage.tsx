import { FC } from 'react';
import PageTitle from 'components/PageTitle/PageTitle';
import { Button } from '@material-tailwind/react';
import useToggle from 'hooks/useToggle';
import ModalCreateCategory from 'components/Categories/Modal/ModalCreateCategory';
import { useAppSelector } from 'hooks/redux';
import { getCompanies } from 'store/reducers/categorySlice';
import CategoriesTable from 'components/Categories/Table/CategoriesTable';
import { useCheckPermission } from 'hooks/useCheckPermission';
import { PERMISSIONS } from 'constants/permissions';

const CategoriesPage: FC = (): JSX.Element => {
  const [isShowModal, toggleShowModal] = useToggle(false);
  const isCanCreateCategory = useCheckPermission(PERMISSIONS.CATEGORIES.CREATE);
  const categories = useAppSelector(
    getCompanies(1, 10),
  );
  return (
    <>
      <div className='flex justify-between items-center'>
        <PageTitle title='Категории расходов' />
        {isCanCreateCategory &&
          <Button
            size='md'
            className='h-10'
            disabled={isShowModal}
            onClick={toggleShowModal}>
            Создать категорию
          </Button>
        }
      </div>
      <CategoriesTable categories={categories} />
      {isCanCreateCategory &&
        <ModalCreateCategory
          open={isShowModal}
          onClose={toggleShowModal}
        />}
    </>
  );
};


export default CategoriesPage;
