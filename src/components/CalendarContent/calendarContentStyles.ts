import styled from 'styled-components';
import { resetBox } from 'src/styles/mixIns';

export const SearchContainer = styled.div`
  width: 23%;
  ${resetBox()};
  display: flex;
  justify-content: flex-end;
`;

export const CalendarWrapper = styled.div`
  ${resetBox()};
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const Wrapper = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 24px 12px 120px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
