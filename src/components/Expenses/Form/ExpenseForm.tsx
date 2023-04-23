import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button, Input, Option, Select } from '@material-tailwind/react';
import FormWrapper from 'components/FormWrapper/FormWrapper';
import { IExpenseFormFields } from 'types/form/IExpenseFromFields';
import { IExpense } from 'types/model/IExpense';
import { getFormatDate } from 'utils/getFormatDate';
import { useGetCategoriesQuery } from 'services/categories';

interface RoleFormProps {
  expense?: IExpense;
  onSubmit: (data: IExpenseFormFields) => void;
}

const RoleForm: FC<RoleFormProps> = ({ expense, onSubmit }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<IExpenseFormFields>({
    defaultValues: expense
      ? { ...expense }
      : {
          date: getFormatDate(new Date()),
        },
  });
  const { data: categories, isFetching } = useGetCategoriesQuery({});
  const onSubmitHandler: SubmitHandler<IExpenseFormFields> = data => {
    onSubmit(data);
  };

  const onResetHandler = (): void => {
    reset();
  };

  return (
    <FormWrapper>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmitHandler)}>
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
        {categories && (
          <Controller
            control={control}
            name='categoryId'
            rules={{
              required: true,
            }}
            render={({ field: { value, onChange } }) => (
              <Select
                disabled={!categories || !categories?.length}
                onChange={event => {
                  onChange(Number(event));
                }}
                value={value ? String(value) : undefined}
                label='Категория расхода'
              >
                {categories?.map(category => {
                  return (
                    <Option value={String(category.id)} key={category.id}>
                      {category.name}
                    </Option>
                  );
                })}
              </Select>
            )}
          />
        )}
        <div className='flex ml-auto mt-3 gap-3'>
          <Button onClick={onResetHandler} color='blue-gray' type='button'>
            Сбросить
          </Button>
          <Button type='submit'>{expense ? 'Сохранить' : 'Создать'}</Button>
        </div>
      </form>
    </FormWrapper>
  );
};

export default RoleForm;
