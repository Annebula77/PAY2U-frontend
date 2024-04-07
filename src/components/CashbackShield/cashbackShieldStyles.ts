import styled from 'styled-components';
import { resetBox } from 'src/styles/mixIns';

export const StyledDiv = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 12px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid rgba(229, 229, 229, 1);
  width: 100%;
`;

export const UpperTextBox = styled.div`
  ${resetBox()};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: center;
  gap: 8px;
`;

export const LogoContainer = styled.div`
  ${resetBox()};
  display: flex;
  flex-direction: row;
  align-items: center;
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
