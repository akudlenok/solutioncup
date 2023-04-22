import { ICategory } from 'types/model/ICategory';
import { FC } from 'react';

interface CategoriesTableProps {
  categories: ICategory[];
}

const CategoriesTable: FC<CategoriesTableProps> = ({ categories }): JSX.Element => {
  return (
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
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};

export default CategoriesTable;
