import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ICategoryFormFields } from 'types/form/IRoleFormFields';
import { Button, Input } from '@material-tailwind/react';
import FormWrapper from 'components/FormWrapper/FormWrapper';
import { IExpenseFormFields } from 'types/form/IExpenseFromFields';
import { IExpense } from 'types/model/IExpense';

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
  const onSubmitHandler: SubmitHandler<IExpenseFormFields> = data => {
    onSubmit(data);
  };

  const onResetHandler = (): void => {
    reset();
  };

  return (
    <FormWrapper>
      <form className='flex flex-col' onSubmit={handleSubmit(onSubmitHandler)}>
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
