import { Typography } from "@mui/material";
import BackArrowIcon from "../icons/BackArrowIcon";
import styled from "styled-components";
import SearchIcon from "../icons/SearchIcon";
import Slider from "../slider/Slider";
import RecommendedShield from "../recommendedShield/RecommendedShield";

const HeaderWrapper = styled.div`
  width: 100%; 
  margin: 0;
  background: ${({ theme }) => theme.custom.header};
  padding: 60px 16px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ControlsContainer = styled.nav`
  width: 100%; 
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 20px;
`;
const SearchContainer = styled.div`
  width: 50%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <ControlsContainer>
        <BackArrowIcon />
        <Typography variant="h2" align="left">Подписки</Typography>
        <SearchContainer>
          <SearchIcon />
        </SearchContainer>
      </ControlsContainer>
      <Slider
        // NOTE: временное решение для демонстрации MVP
        slides={Array.from({ length: 10 }, (_, index) => (
          <RecommendedShield key={index} img="" title='' cashback='' route="/" />
        ))}
        title="Рекомендации"
        slidePerView='3.5'
      />

    </HeaderWrapper>
  );
}
export default Header;