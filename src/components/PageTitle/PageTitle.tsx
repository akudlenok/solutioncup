import React, { FC } from 'react';
import { Typography } from '@material-tailwind/react';

interface PageTitleProps {
  title: string;
}

const PageTitle: FC<PageTitleProps> = ({ title }): JSX.Element => (
  <Typography variant='h1' className='mb-3'>
    {title}
  </Typography>
);

export default PageTitle;
