import { createGlobalStyle } from 'styled-components';


const GlobalStyle = createGlobalStyle`
   body {
    margin: 0;
    padding: 0;   
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

