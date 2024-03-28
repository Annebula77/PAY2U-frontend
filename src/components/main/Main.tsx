import { type FC, ReactNode } from 'react';
import styled from 'styled-components';


interface MainProps {
  children: ReactNode;
}

const StyledMain = styled.main<MainProps>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;  
  padding: 0;
  margin: 0;
 
`;

const Main: FC<MainProps> = ({ children }) => (
  <StyledMain>
    {children}
  </StyledMain>
);

export default Main;