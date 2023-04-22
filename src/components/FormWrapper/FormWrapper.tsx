import { FC, ReactNode } from 'react';

interface FormWrapperProps {
  children: ReactNode;
}

const FormWrapper: FC<FormWrapperProps> = ({ children }) => {
  return (
    <div className='form-control w-full bg-base-200 p-4 rounded-lg shadow'>
      {children}
    </div>
  );
};

export default FormWrapper;
