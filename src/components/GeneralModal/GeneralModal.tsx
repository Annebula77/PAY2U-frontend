import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { resetBox } from 'src/styles/mixIns';
import CloseIcon from '../icons/CloseIcon';

interface ModalProps {
  onClose?: () => void;
  children: ReactNode;
  showCloseButton?: boolean;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
`;

const ModalWindow = styled.div`
  ${resetBox()}
  display: flex;
  flex-direction: column;
  position: relative;
  background: ${({ theme }) => theme.palette.background.default};
  border-radius: 12px;
  margin: auto;
  width: 375px;
  z-index: 10;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

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
