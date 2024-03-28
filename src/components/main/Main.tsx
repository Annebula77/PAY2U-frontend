import { type FC, ReactNode } from 'react';
import styled from 'styled-components';
import { resetBox } from '../../styles/mixIns';


interface MainProps {
  children: ReactNode;
}

const StyledMain = styled.main<MainProps>`  
  display: flex;
  flex-direction: column;  
  ${resetBox()};
 
`;

const Main: FC<MainProps> = ({ children }) => (
  <StyledMain>
    {children}
  </StyledMain>
);

export default Main;