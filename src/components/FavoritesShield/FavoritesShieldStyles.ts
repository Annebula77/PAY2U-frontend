import styled from 'styled-components';
import { resetBox } from 'src/styles/mixIns';

export const StyledDiv = styled.div`
  ${resetBox()};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
  gap: 8px;
`;

export const UpperTextBox = styled.div`
  ${resetBox()};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: center;
`;

export const LogoContainer = styled.div`
  ${resetBox()};
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 8px;
`;

export const Logo = styled.img`
  display: inline-block;
  width: 40px;
  height: 40px;
  padding: 0;
  margin: 0;
  border-radius: 12px;
  object-fit: contain;
`;

export const CashBackBox = styled.div`
  ${resetBox()};
  width: 30%;
  display: flex;
  justify-content: center;
`;
