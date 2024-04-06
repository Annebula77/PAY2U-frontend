import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import CloseIcon from '../icons/CloseIcon';
import { CloseButton, ModalOverlay, ModalWindow } from './generalModalStyles';

interface ModalProps {
  onClose?: () => void;
  children: ReactNode;
  showCloseButton?: boolean;
}

export const GeneralModal: FC<ModalProps> = ({
  onClose,
  children,
  showCloseButton,
}) => {
  return createPortal(
    <ModalOverlay onClick={onClose}>
      <ModalWindow onClick={evt => evt.stopPropagation()}>
        {showCloseButton && onClose && (
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        )}
        {children}
      </ModalWindow>
    </ModalOverlay>,
    document.body
  );
};
