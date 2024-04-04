import styled from 'styled-components';
import { resetBox } from '../../styles/mixIns';

export const StyledTabSection = styled.div`
  ${resetBox()};
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ChipWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 0 0 24px;
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  align-items: center;
  gap: 12px;

  > * {
    flex: 1;
  }
`;

export const IconWrapper = styled.div`
  ${resetBox()};
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
