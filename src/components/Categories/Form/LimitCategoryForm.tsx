import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ICategory, ILimitCategory } from 'types/model/ICategory';
import { Button, Input, Option, Select } from '@material-tailwind/react';
import FormWrapper from 'components/FormWrapper/FormWrapper';
import { ILimitCategoryFormFields } from 'types/form/ILimitCategoryFormFields';
import SelectMonth from 'components/SelectMonth/SelectMonth';

interface LimitCategoryFormProps {
  categories: ICategory[];
  limit: ILimitCategory;
  onSubmit: (data: ILimitCategoryFormFields) => void;
}

const LimitCategoryForm: FC<LimitCategoryFormProps> = ({ limit, onSubmit, categories }) => {
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ILimitCategoryFormFields>({ defaultValues: limit });
  const onSubmitHandler: SubmitHandler<ILimitCategoryFormFields> = data => {
    onSubmit(data);
  };

  const onResetHandler = (): void => {
    reset();
  };

  return (
    <FormWrapper>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmitHandler)}>
        <Controller
          control={control}
          name='month'
          rules={{
            required: true,
          }}
          render={({ field: { value } }) => <SelectMonth selectMonthId={value} disabled={true} />}
        />
        <Controller
          control={control}
          name='categoryId'
          rules={{
            required: true,
          }}
          render={({ field: { value, onChange } }) => (
            <Select
              disabled={!categories || !categories?.length || !!limit.id}
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
        <Input
          label='Лимит'
          {...register('limit', {
            required: true,
          })}
          type='number'
          autoComplete='off'
        />
        <div className='flex ml-auto mt-3 gap-3'>
          <Button onClick={onResetHandler} color='blue-gray' type='button'>
            Сбросить
          </Button>
          <Button type='submit'>{limit.id ? 'Сохранить' : 'Добавить'}</Button>
        </div>
      </form>
    </FormWrapper>
  );
};

export default LimitCategoryForm;
