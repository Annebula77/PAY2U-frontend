import { createGlobalStyle } from 'styled-components';


const GlobalStyle = createGlobalStyle`
   body {
    margin: 0;
    padding: 0;
    overflow-x: hidden; 
    overflow-y: scroll; 
    -webkit-overflow-scrolling: touch;
    font-family: 'Inter', sans-serif; 
  }

  ::-webkit-scrollbar {
    display: none;
  }
  
  html, body {
  max-width: 576px; 
  height: 100%;
  margin: 0 auto;
  font-size: 16px;
}
`;

export default GlobalStyle;

