import { Paper } from "@mui/material";
import styled from "styled-components";
import Slider from "../slider/Slider";
import CatalogueShield from "../catalogueShield/CatalogShield";


const StyledTabSection = styled.div`
 box-sizing: border-box;
 width: 100%;
 margin: 0;
 padding: 20px 0 99px;
 display: flex;
 flex-direction: column; 
 gap: 12px;
`;

const CatalogueTab = () => {
  return (
    <StyledTabSection>
      <Paper sx={{ maxWidth: '100%', padding: '20px', boxSizing: 'border-box' }}>
        <Slider
          // NOTE: временное решение для демонстрации MVP
          slides={Array.from({ length: 10 }, (_, index) => (
            <CatalogueShield key={index} img="" price={0} cashback='' route="/" name="" />
          ))}
          title="Фильмы"
          slidePerView='2.5'
          showNextButton
          spaceBetween="90"
        />
      </Paper>
      <Paper sx={{ maxWidth: '100%', padding: '20px', boxSizing: 'border-box' }}>
        <Slider
          slides={Array.from({ length: 10 }, (_, index) => (
            // NOTE: временное решение для демонстрации MVP
            <CatalogueShield key={index} img="" price={0} cashback='' route="/" name="" />
          ))}
          title="Книги"
          slidePerView='2.5'
          showNextButton
          spaceBetween="90"
        />
      </Paper>
      <Paper sx={{ maxWidth: '100%', padding: '20px', boxSizing: 'border-box' }}>
        <Slider
          slides={Array.from({ length: 10 }, (_, index) => (
            // NOTE: временное решение для демонстрации MVP
            <CatalogueShield key={index} img="" price={0} cashback='' route="/" name="" />
          ))}
          title="Музыка"
          slidePerView='2.5'
          showNextButton
          spaceBetween="90"
        />
      </Paper>
    </StyledTabSection>

  );
};


export default CatalogueTab;