import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ICategory } from 'types/model/ICategory';
import { ICategoryFormFields } from 'types/form/IRoleFormFields';
import { Button, Input } from '@material-tailwind/react';
import FormWrapper from 'components/FormWrapper/FormWrapper';

interface RoleFormProps {
  category?: ICategory;
  onSubmit: (data: ICategoryFormFields) => void;
}

const RoleForm: FC<RoleFormProps> = ({ category, onSubmit }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ICategoryFormFields>({ defaultValues: category ? { ...category } : {} });
  const onSubmitHandler: SubmitHandler<ICategoryFormFields> = data => {
    onSubmit(data);
  };

  const onResetHandler = (): void => {
    reset();
  };

  return (
    <FormWrapper>
      <form className='flex flex-col' onSubmit={handleSubmit(onSubmitHandler)}>
        <Input
          label='Название категории'
          {...register('name', {
            required: true,
          })}
          autoComplete='off'
        />
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
            {category ? 'Сохранить' : 'Создать'}
          </Button>
        </div>
      </form>
    </FormWrapper>
  );
};

export default RoleForm;
