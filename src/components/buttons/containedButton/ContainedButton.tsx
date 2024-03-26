import styled from 'styled-components';
import Button from '@mui/material/Button';

export const ContainedButton = styled(Button)`
  width: 100%;
  ${({ theme }) => `
    primary: ${theme.palette.primary.light};
    color: ${theme.palette.primary.contrastText};
    &:hover {
      background-color: ${theme.palette.primary.dark};
    }    
  `}
`;