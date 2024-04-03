import styled from 'styled-components';
import { resetBox } from './mixIns';

// стили для страниц и онбоурдинга
export const StyledSection = styled.section`
  width: 375px;
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
  margin: 0 0 40px;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

// обертка с градиентом

export const GradientWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 0;
  background: ${({ theme }) => theme.custom.header};
  padding: 60px 16px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  gap: 20px;
`;

// стили для верхней шапки с поиском на страницах
export const ControlsContainer = styled.nav`
  width: 100%;
  margin: 0;
  padding: 60px 16px 0px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
export const SearchContainer = styled.div`
  width: 35%;
  ${resetBox()};
  display: flex;
  justify-content: flex-end;
`;
//  невидимая кнопака
export const InvisibleButton = styled.button`
  ${resetBox()};
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
