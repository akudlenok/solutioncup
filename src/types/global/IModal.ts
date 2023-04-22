import React from 'react';

export interface IBaseModal {
  open: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  actions?: React.ReactNode;
}

export interface IModal extends Omit<IBaseModal, 'children'> {
}
