import { createGlobalStyle } from 'styled-components';
import { resetBox } from './styles/mixIns';


const GlobalStyle = createGlobalStyle`
   body {
    position: relative;
    ${resetBox()};  
    height: 100vh; 
    overflow-y: auto; 
    -webkit-overflow-scrolling: touch; 
    font-family: 'Inter', sans-serif;

    /* Для Firefox */
    scrollbar-width: none; 

    /* Для IE и Edge */
    -ms-overflow-style: none;
  }

  /* Скрываем скроллбары в WebKit-браузерах (Chrome, Safari) */
  ::-webkit-scrollbar {
    display: none;
  }
  
  html, body {
  max-width: 375px; 
  height: 100%;
  margin: 0 auto;
  font-size: 16px;
}
`;

export default GlobalStyle;

