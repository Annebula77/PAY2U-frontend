import styled from 'styled-components';
import { resetBox } from 'src/styles/mixIns';
import { CardContent } from '@mui/material';

export const StyledDiv = styled.div`
  ${resetBox()};
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 60%;
  gap: 4px;
`;

export const StyledLinkDiv = styled.div`
  margin: 14px 0 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

export const StyledCardContent = styled(CardContent)`
  position: relative;
  ${resetBox()};
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const BackgroundImage = styled.img`
  position: absolute;
  bottom: 0;
  right: 16px;
  width: 100px;
  height: 100px;
  margin: 0;
  padding: 0;
`;

export const StyledParagraph = styled.p`
  ${resetBox()};
  width: 50%;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: -0.078px;
  color: rgba(234, 65, 127, 1);
`;

export const InvisibleButton = styled.button`
  ${resetBox()};
  display: flex;
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
