import { Typography } from "@mui/material";
import BackArrowIcon from "../icons/BackArrowIcon";
import styled from "styled-components";
import SearchIcon from "../icons/SearchIcon";
import Slider from "../slider/Slider";
import RecommendedShield from "../recommendedShield/RecommendedShield";
import NoSubsShield from "../noSubsShield/NoSubsShield";
import HasSubsShield from "../hasSubsShield/HasSubsShield";
import { Link } from "react-router-dom";
import { resetBox } from "../../styles/mixIns";

const HeaderWrapper = styled.div`
  width: 100%; 
  margin: 0;
  background: ${({ theme }) => theme.custom.header};
  padding: 60px 16px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  gap: 20px;
`;

const ControlsContainer = styled.nav`
  width: 100%; 
  margin: 0 0 24px;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 10px;  
`;
const SearchContainer = styled.div`
  width: 55%;
  ${resetBox()};
  display: flex;
  justify-content: flex-end;
`;

const MySubsContainer = styled.article`
  width: 100%; 
  ${resetBox()};
  display: flex;
  flex-direction: column;
  gap: 20px;  
`;

const SubsRow = styled.div`
  width: 100%; 
  ${resetBox()};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;  
`;

const TextButton = styled.button`
${resetBox()};
outline: none;
border: none;
background-color: transparent;
cursor: pointer;
`;

// NOTE: mock data, needs to be replaced
const mockSubscriptions = { countSub: 3, cashbackMonth: 150, notificationDate: new Date(), toPay: 400 };
// const mockSubscriptions = { countSub: 0, cashbackMonth: 0, notificationDate: null, toPay: 0 };

const Header = () => {
  return (
    <HeaderWrapper>
      <ControlsContainer>
        <Link to='/' style={{ textDecoration: 'none', margin: '0', padding: 0 }}>
          <BackArrowIcon />
        </Link>
        <Typography variant="h2" align="left">Подписки</Typography>
        <SearchContainer>
          <Link to='' style={{ textDecoration: 'none', width: '10%', margin: 0, padding: 0 }}>
            <SearchIcon />
          </Link>
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
      <MySubsContainer>
        <Typography variant="h1" color="text.primary" align="left">Мои подписки</Typography>
        <SubsRow>
          <Link to='' style={{ textDecoration: 'none', width: '48.5%', margin: 0, padding: 0 }}>
            {mockSubscriptions.countSub !== 0 ? (
              <HasSubsShield
                stats={mockSubscriptions.countSub}
                name="Активных"
              />) : (
              <NoSubsShield
                title="Нет активных"
                text="Выберете подходящие
              в каталоге"
              />)}
          </Link>
          <Link to='' style={{ textDecoration: 'none', width: '48.5%', margin: 0, padding: 0 }}>
            {mockSubscriptions.cashbackMonth !== 0 ? (
              <HasSubsShield
                stats={mockSubscriptions.cashbackMonth}
                name="Кешбэк "
                showCurrencySymbol

              />) : (
              <NoSubsShield
                title="Кешбэк"
                text="Начислим после
              подключения"
              />)}
          </Link>
          <Link to='' style={{ textDecoration: 'none', width: '100%', margin: 0, padding: 0 }}>
            {mockSubscriptions.notificationDate !== null && mockSubscriptions.toPay !== 0 ? (
              <HasSubsShield
                stats={mockSubscriptions.toPay}
                name="Ближайшее списание"
                showCurrencySymbol
                date={mockSubscriptions.notificationDate}
              />) : (
              <NoSubsShield
                title="Ближайшее списание"
                text="Нет активных подписок"
              />)}
          </Link>
        </SubsRow>
        <TextButton type="button">
          <Typography
            className="textRegular"
            color="primary.main"
            align="right"
            sx={{
              marginTop: '-8px',
              marginBottom: '20px'
            }}
          >
            Как работает?
          </Typography>
        </TextButton>

      </MySubsContainer >
    </HeaderWrapper >
  );
}
export default Header;