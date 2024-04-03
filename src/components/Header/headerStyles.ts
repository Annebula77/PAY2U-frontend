import styled from 'styled-components';
import { resetBox } from 'src/styles/mixIns';

export const ControlsContainer = styled.nav`
  width: 100%;
  margin: 0 0 24px;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 10px;
`;
export const SearchContainer = styled.div`
  width: 55%;
  ${resetBox()};
  display: flex;
  justify-content: flex-end;
`;

export const MySubsContainer = styled.article`
  width: 100%;
  ${resetBox()};
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SubsRow = styled.div`
  width: 100%;
  ${resetBox()};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;
