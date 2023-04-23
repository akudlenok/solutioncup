import { FC, ReactNode } from 'react';

interface FormWrapperProps {
  children: ReactNode;
}

const FormWrapper: FC<FormWrapperProps> = ({ children }) => {
  return <div className='form-control w-full  p-4'>{children}</div>;
};

export default FormWrapper;
