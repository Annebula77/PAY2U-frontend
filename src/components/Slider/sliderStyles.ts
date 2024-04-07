import styled from 'styled-components';
import { resetBox } from 'src/styles/mixIns';

export const SwiperContainer = styled.div`
  width: 100%;
  ${resetBox()};
`;

export const NavContainer = styled.div`
  ${resetBox()};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const NextButton = styled.button`
  margin: 0 0 10px;
  padding: 0;
  box-sizing: border-box;
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
