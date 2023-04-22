import React, { FC } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

const Loading: FC = (): JSX.Element => (
  <div className='flex items-center justify-center'>
    <div className='flex justify-center items-center space-x-1 text-sm text-blue-500'>
      <ArrowPathIcon className='w-16 h-16 animate-spin' />
    </div>
  </div>
);

export default Loading;
