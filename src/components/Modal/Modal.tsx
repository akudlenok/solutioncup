import { FC } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import { IBaseModal } from 'types/global/IModal';

const Modal: FC<IBaseModal> = ({ open, title, children, onClose, actions }) => {
  return (
    <Dialog open={open} handler={onClose}>
      {title && !!title.trim() && <DialogHeader> {title}</DialogHeader>}
      <DialogBody>{children}</DialogBody>
      {actions && <DialogFooter>{actions}</DialogFooter>}
    </Dialog>
  );
};

export default Modal;
