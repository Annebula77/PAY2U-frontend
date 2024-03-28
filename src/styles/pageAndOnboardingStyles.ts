import styled from 'styled-components';
import { resetBox } from './mixIns';
export const StyledSection = styled.section`
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0;
`;

export const ScreenShot = styled.img`
  margin: 0;
  padding: 0;
  width: 294px;
  height: 294px;
`;

export const TextDiv = styled.div`
  ${resetBox()};
  width: 100%;
  display: flex;
  flex-direction: column;  
  gap: 8px;
`;

export const TextDivLong = styled.div`
  margin:0 0 40px; 
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;  
  gap: 8px;
`;