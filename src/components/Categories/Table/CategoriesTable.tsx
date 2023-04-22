import { ICategory } from 'types/model/ICategory';
import { FC, useState } from 'react';
import { useCheckPermission } from 'hooks/useCheckPermission';
import { PERMISSIONS } from 'constants/permissions';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid';
import { Button } from '@material-tailwind/react';
import ModalUpdateCategory from 'components/Categories/Modal/ModalUpdateCategory';
import useToggle from 'hooks/useToggle';
import { useAppDispatch } from 'hooks/redux';
import { categorySlice } from 'store/reducers/categorySlice';

interface CategoriesTableProps {
  categories: ICategory[];
}

const CategoriesTable: FC<CategoriesTableProps> = ({ categories }): JSX.Element => {
  const dispatch = useAppDispatch();
  const isCanEditCategory = useCheckPermission(PERMISSIONS.CATEGORIES.UPDATE);
  const isCanDeleteCategory = useCheckPermission(PERMISSIONS.CATEGORIES.DELETE);
  const [isShowModal, toggleShowModal] = useToggle(false);
  const [updateCategory, setUpdateCategory] = useState<ICategory | null>(null);
  const { delete: deleteAction } = categorySlice.actions;

  const onUpdateClick = (category: ICategory) => {
    setUpdateCategory(category);
    toggleShowModal();
  };

  const onDeleteClick = (categoryId: number) => {
    dispatch(deleteAction(categoryId));
  };

  return (
    <>
      <table className='min-w-full text-left text-sm font-light'>
        <thead className='border-b font-medium dark:border-neutral-500'>
          <tr>
            <th scope='col' className='px-6 py-4'>#</th>
            <th scope='col' className='px-6 py-4'>Наименование категории</th>
          </tr>
        </thead>
        <tbody>
          {
            categories.map(category => {
              return (
                <tr className='border-b dark:border-neutral-500'>
                  <td className='whitespace-nowrap px-6 py-4 font-medium'>{category.id}</td>
                  <td className='whitespace-nowrap px-6 py-4'>{category.name}</td>
                  <div className={!isCanEditCategory && !isCanDeleteCategory ? 'd-none' : 'flex gap-2 justify-end'}>
                    {isCanEditCategory &&
                      <Button
                        size='sm'
                        disabled={isShowModal}
                        onClick={() => onUpdateClick(category)}
                      >
                        <PencilSquareIcon className='w-5 h-5' />
                      </Button>
                    }
                    {isCanDeleteCategory &&
                      <Button
                        size='sm'
                        color='red'
                        onClick={() => onDeleteClick(category.id)}
                      >
                        <TrashIcon className='w-5 h-5' />
                      </Button>
                    }
                  </div>
                </tr>
              );
            })
          }
        </tbody>
      </table>
      {isCanEditCategory &&
        updateCategory &&
        <ModalUpdateCategory
          category={updateCategory}
          open={isShowModal}
          onClose={toggleShowModal}
        />
      }
    </>
  );
};

export default CategoriesTable;
