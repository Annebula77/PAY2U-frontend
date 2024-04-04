import styled from 'styled-components';
import { resetBox } from 'src/styles/mixIns';

export const DetailsContainer = styled.ul`
  ${resetBox()}
  max-width: 343px;
  display: flex;
  text-decoration: none;
  flex-direction: column;
  gap: 12px;
`;

export const HeadContainer = styled.div`
  ${resetBox()}
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const SlotContainer = styled.li`
  box-sizing: border-box;
  margin: 0;
  padding: 12 0 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.palette.secondary.main};
`;

export const ButtonContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin: 16px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;
