import styled from 'styled-components';
import Button from '@mui/material/Button';

export const OutlinedButton = styled(Button)`
  width: 100%;
  ${({ theme }) => `
    color: ${theme.palette.primary.light};
    border-color: ${theme.palette.primary.light};
    &:hover {
      background-color: ${theme.palette.primary.main};
      color: ${theme.palette.primary.dark};
      border-color: ${theme.palette.primary.dark};
    }
  `}
`;
