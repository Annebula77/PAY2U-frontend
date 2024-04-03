import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SearchIcon from '../components/icons/SearchIcon';
import BackArrowIcon from '../components/icons/BackArrowIcon';
import {
  ControlsContainer,
  SearchContainer,
  StyledSection,
} from '../styles/reusableStyles';

const TextContainer = styled.article`
  width: 100%;
  margin: 0;
  padding: 6px 16px 0px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const CookiesPage = () => {
  return (
    <StyledSection>
      <ControlsContainer>
        <Link
          to="/main"
          style={{ textDecoration: 'none', margin: '0', padding: 0 }}
        >
          <BackArrowIcon />
        </Link>
        <Typography variant="h2" align="left">
          Файлы и cookie
        </Typography>
        <SearchContainer>
          <Link
            to=""
            style={{
              textDecoration: 'none',
              width: '10%',
              margin: 0,
              padding: 0,
            }}
          >
            <SearchIcon />
          </Link>
        </SearchContainer>
      </ControlsContainer>
      <TextContainer>
        <Typography
          variant="h3"
          align="left"
          sx={{
            marginTop: '24px',
            marginBottom: '12px',
          }}
        >
          Что такое cookie?
        </Typography>
        <Typography className="textRegular" color="text.primary" align="left">
          Cookie — небольшой фрагмент данных, отправленный веб-сервером и
          хранимый на компьютере пользователя.
        </Typography>
        <Typography
          variant="h3"
          align="left"
          sx={{
            marginTop: '24px',
            marginBottom: '12px',
          }}
        >
          Как мы используем cookies?
        </Typography>
        <Typography className="textRegular" color="text.primary" align="left">
          Когда вы посещаете наш сервис, мы собираем и обрабатываем файлы
          cookie. Они содержат информацию о ваших прошлых посещениях сервиса,
          приложений банков, с которых вы перешли на сервис, присвоенные
          идентификаторы.
        </Typography>
        <Typography
          variant="h3"
          align="left"
          sx={{
            marginTop: '24px',
            marginBottom: '12px',
          }}
        >
          Политика конфиденциальности
        </Typography>
        <Typography className="textRegular" color="text.primary" align="left">
          Мы со всей ответственностью и в соответствии с законодательством
          относимся к защите персональных данных пользователя сервиса pay2u.
        </Typography>
        <Typography
          variant="h3"
          align="left"
          sx={{
            marginTop: '24px',
            marginBottom: '12px',
          }}
        >
          Настройка cookies
        </Typography>
        <Typography className="textRegular" color="text.primary" align="left">
          Пользователь сайта всегда может контролировать файлы cookie на своём
          устройстве.
        </Typography>
      </TextContainer>
    </StyledSection>
  );
};
export default CookiesPage;
