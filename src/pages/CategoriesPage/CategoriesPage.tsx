import { FC } from 'react';
import PageTitle from 'components/PageTitle/PageTitle';
import { Button, Tooltip } from '@material-tailwind/react';
import useToggle from 'hooks/useToggle';
import ModalCreateCategory from 'components/Categories/Modal/ModalCreateCategory';
import CategoriesTable from 'components/Categories/Table/CategoriesTable';
import { useCheckPermission } from 'hooks/useCheckPermission';
import { PERMISSIONS } from 'constants/permissions';
import { useGetCategoriesQuery } from 'services/categories';
import Loading from 'components/Loading/Loading';
import { usePagination } from 'hooks/usePagination';

const CategoriesPage: FC = (): JSX.Element => {
  const [isShowModal, toggleShowModal] = useToggle(false);
  const isCanCreateCategory = useCheckPermission(PERMISSIONS.CATEGORIES.CREATE);
  const { page, setPage, size, setSize } = usePagination();
  const { data: categories, isFetching } = useGetCategoriesQuery({
    page,
    size,
  });
  return (
    <>
      <div className='flex justify-between items-center'>
        <PageTitle title='Категории расходов' />
      </div>
      {isFetching ? (
        <Loading />
      ) : categories && categories.length ? (
        <CategoriesTable categories={categories} />
      ) : (
        <div>Нет данных</div>
      )}
      {isCanCreateCategory && <ModalCreateCategory open={isShowModal} onClose={toggleShowModal} />}
      {isCanCreateCategory && (
        <div className='fixed bottom-10 right-10'>
          <Tooltip placement='left' content='Добавить категорию'>
            <Button size='md' className='h-10' disabled={isShowModal || isFetching} onClick={toggleShowModal}>
              +
            </Button>
          </Tooltip>
        </div>
      )}
    </>
  );
};

export default CategoriesPage;
