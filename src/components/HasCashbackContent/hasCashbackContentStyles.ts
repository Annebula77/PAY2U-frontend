import styled from 'styled-components';
import { resetBox } from 'src/styles/mixIns';

export const StyledSection = styled.section`
  width: 375px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 0 16px 60px;
`;

export const CashbackInfoContainer = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 20px 0 24px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 12px;
`;

export const TextContainer = styled.div`
  ${resetBox()};
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4x;
`;

export const ShieldContainer = styled.section`
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 32px 0 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Logo = styled.img`
  margin: 0;
  padding: 0;
  width: 35px;
  height: 42px;
`;
