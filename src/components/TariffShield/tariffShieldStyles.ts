import styled from 'styled-components';
import { resetBox } from 'src/styles/mixIns';

export const NameContainer = styled.div`
  width: 100%;
  ${resetBox()};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const StyledDiv = styled.div`
  ${resetBox()};
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  width: 100%;
`;

export const UpperTextBox = styled.div`
  ${resetBox()};
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 4px;
`;

export const LowerBox = styled.div`
  box-sizing: border-box;
  padding: 0;
  margin: 4px 0 0;
  display: flex;
  justify-content: flex-start;
`;
