import styled from 'styled-components';
import { resetBox } from 'src/styles/mixIns';

export const StyledDiv = styled.div`
  ${resetBox()};
  display: flex;
  flex-direction: column;
  align-content: flex-end;
  width: 62%;
  gap: 40px;
`;

export const UpperTextBox = styled.div`
  ${resetBox()};
  display: flex;
  flex-direction: column;
  align-content: flex-end;
  justify-content: flex-start;
`;

export const LogoContainer = styled.div`
  width: 60%;
  ${resetBox()};
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  align-items: flex-start;
  gap: 4px;
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
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
