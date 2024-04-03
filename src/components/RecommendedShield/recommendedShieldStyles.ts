import styled from 'styled-components';
import { resetBox } from 'src/styles/mixIns';

export const TextContainer = styled.span`
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0 0 0 4px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const LogoWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.palette.background.default};
  margin: 0 0 8px;
  padding: 0;
`;
export const Logo = styled.img`
  width: 88px;
  height: 88px;
  display: block;
  ${resetBox()};
  border-radius: 12px;
  object-fit: contain;
`;
