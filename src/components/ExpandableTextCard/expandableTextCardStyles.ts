import { Typography } from '@mui/material';
import styled from 'styled-components';

export const ShowMoreContainer = styled.div`
  display: flex;
  align-items: center;
  margin: -16px 0 0;
  padding: 0;
  cursor: pointer;
  user-select: none;
  justify-content: flex-start;
`;

export const ShowMoreText = styled(Typography)`
  && {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

export const TextContainer = styled.section`
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0 16px 0;
  display: flex;
  flex-direction: column;
`;
