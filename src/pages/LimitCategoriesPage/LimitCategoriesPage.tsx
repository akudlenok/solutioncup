import { FC, useEffect, useState } from 'react';
import { getCurrentMonth } from 'utils/getCurrentMonth';
import { useCheckPermission } from 'hooks/useCheckPermission';
import { PERMISSIONS } from 'constants/permissions';
import { MONTHS } from 'constants/month';
import PageTitle from 'components/PageTitle/PageTitle';
import SelectMonth from 'components/SelectMonth/SelectMonth';
import { useGetCategoriesQuery, useGetLimitCategoriesQuery } from 'services/categories';
import Loading from 'components/Loading/Loading';
import { Button } from '@material-tailwind/react';
import { PencilSquareIcon } from '@heroicons/react/20/solid';
import ModalCreateLimitCategory from 'components/Categories/Modal/ModalCreateLimitCategory';
import { ICategory, ILimitCategory } from 'types/model/ICategory';
import useToggle from 'hooks/useToggle';
import ModalEditLimitCategory from 'components/Categories/Modal/ModalEditLimitCategory';

interface ILimit extends ICategory {
  limit: ILimitCategory;
}

const LimitCategoriesPage: FC = (): JSX.Element => {
  const currentMonth = getCurrentMonth();
  const isCanEditLimit = useCheckPermission(PERMISSIONS.LIMIT_CATEGORY.UPDATE);
  const [selectMonthId, setSelectMonthId] = useState<number>(currentMonth);
  const [isShowModalCreateLimit, toggleShowModalCreateLimit] = useToggle(false);
  const [isShowModalEditLimit, toggleShowModalEditLimit] = useToggle(false);
  const pageTitle = `Лимиты по категориям на ${MONTHS[selectMonthId]}`;
  const [selectedLimitCategory, setSelectedLimitCategory] = useState<ILimitCategory | null>(null);
  const { data: categories, isFetching } = useGetCategoriesQuery({});
  const { data: limitCategories, isFetching: isLimitCategoriesFetching } = useGetLimitCategoriesQuery({
    month: selectMonthId,
  });
  const onUpdateClick = (limit: ILimitCategory) => {
    setSelectedLimitCategory(limit);
    !limit.id ? toggleShowModalCreateLimit() : toggleShowModalEditLimit();
  };
  const [limits, setLimits] = useState<ILimit[]>([]);
  useEffect(() => {
    if (!categories) {
      setLimits([]);
      return;
    }

    setLimits(
      categories.map(category => {
        let item: ILimit = {
          ...category,
          limit: {
            id: 0,
            month: selectMonthId,
            categoryId: category.id,
            category: category,
            limit: 0,
          },
        };

        if (limitCategories) {
          const categoryLimit = limitCategories.find(limit => limit.categoryId === category.id);
          if (categoryLimit) {
            item.limit = categoryLimit;
          }
        }

        return item;
      }),
    );
  }, [categories, limitCategories]);
  return (
    <>
      <div className='flex justify-between items-center'>
        <PageTitle title={pageTitle} />
        <div className='w-56'>
          <SelectMonth selectMonthId={selectMonthId} setSelectMonthId={setSelectMonthId} />
        </div>
      </div>
      {isFetching ? (
        <Loading />
      ) : limits.length ? (
        <table className='min-w-full text-left text-sm font-light'>
          <thead className='border-b font-medium dark:border-neutral-500'>
            <tr>
              <th scope='col' className='px-6 py-4'>
                #
              </th>
              <th scope='col' className='px-6 py-4'>
                Наименование категории
              </th>
              <th scope='col' className='px-6 py-4'>
                Лимит, руб
              </th>
            </tr>
          </thead>
          <tbody>
            {limits.map(category => {
              return (
                <tr className='border-b dark:border-neutral-500' key={category.id}>
                  <td className='whitespace-nowrap px-6 py-4 font-medium'>{category.id}</td>
                  <td className='whitespace-nowrap px-6 py-4'>{category.name}</td>
                  <td className='whitespace-nowrap px-6 py-4'>{category.limit.limit}</td>
                  <td className={!isCanEditLimit ? 'd-none' : 'flex gap-2 px-6 py-4 justify-end'}>
                    {isCanEditLimit && (
                      <Button size='sm' onClick={() => onUpdateClick(category.limit)}>
                        <PencilSquareIcon className='w-5 h-5' />
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div>Данные не найдены</div>
      )}

      {selectedLimitCategory && isShowModalCreateLimit && (
        <ModalCreateLimitCategory
          onClose={toggleShowModalCreateLimit}
          open={isShowModalCreateLimit}
          limit={selectedLimitCategory}
          categories={categories as ICategory[]}
        />
      )}

      {selectedLimitCategory && isShowModalEditLimit && (
        <ModalEditLimitCategory
          onClose={toggleShowModalEditLimit}
          open={isShowModalEditLimit}
          limit={selectedLimitCategory}
          categories={categories as ICategory[]}
        />
      )}
    </>
  );
};

export default LimitCategoriesPage;
