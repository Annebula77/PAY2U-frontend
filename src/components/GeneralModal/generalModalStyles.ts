import styled from 'styled-components';
import { resetBox } from 'src/styles/mixIns';

export const ModalOverlay = styled.div`
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

export const ModalWindow = styled.div`
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

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
