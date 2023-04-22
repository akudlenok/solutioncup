import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ICategoryFormFields } from 'types/form/IRoleFormFields';
import { Button, Input } from '@material-tailwind/react';
import FormWrapper from 'components/FormWrapper/FormWrapper';
import { IExpenseFormFields } from 'types/form/IExpenseFromFields';
import { IExpense } from 'types/model/IExpense';
import { useAppSelector } from 'hooks/redux';
import { getAllCompanies } from 'store/reducers/categorySlice';
import { DEFAUL_SELECT_ID } from 'constants/filter';
import { ICategory } from 'types/model/ICategory';

interface RoleFormProps {
  expense?: IExpense;
  onSubmit: (data: IExpenseFormFields) => void;
}

const RoleForm: FC<RoleFormProps> = ({ expense, onSubmit }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IExpenseFormFields>({ defaultValues: expense ? { ...expense } : {} });
  const categories = useAppSelector(
    getAllCompanies(),
  );
  const onSubmitHandler: SubmitHandler<IExpenseFormFields> = data => {
    onSubmit({
      ...data,
      categoryId: +data.categoryId,
      category: categories.find(item => item.id === +data.categoryId) as ICategory
    });
  };

  const onResetHandler = (): void => {
    reset();
  };

  return (
    <FormWrapper>
      <form className='flex flex-col gap-2' onSubmit={handleSubmit(onSubmitHandler)}>
        <Input
          label='Наименование расхода'
          {...register('name', {
            required: true,
          })}
          autoComplete='off'
        />
        <Input
          label='Дата расхода'
          {...register('date', {
            required: true,
          })}
          type='date'
          autoComplete='off'
        />
        <Input
          label='Сумма расхода'
          {...register('total', {
            required: true,
          })}
          type='number'
          autoComplete='off'
        />
        <select  {...register('categoryId')}>
          <option value={DEFAUL_SELECT_ID}>Не выбрано</option>
          {categories.map(category => {
            return (
              <option value={category.id}>{category.name}</option>
            );
          })}
        </select>
        <div className='flex ml-auto mt-3 gap-3'>
          <Button
            onClick={onResetHandler}
            color='blue-gray'
            type='button'
          >
            Сбросить
          </Button>
          <Button
            type='submit'
          >
            {expense ? 'Сохранить' : 'Создать'}
          </Button>
        </div>
      </form>
    </FormWrapper>
  );
};

export default RoleForm;
