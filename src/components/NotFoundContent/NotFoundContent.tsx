import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'src/store/hooks';
import { fetchSubscriptions } from 'src/store/slices/allSubscriptionsSlice';
import { useNavigate, Link } from 'react-router-dom';
import NotFoundImage from 'src/assets/NotFound.png';
import SearchIcon from '../icons/SearchIcon';
import BackArrowIcon from '../icons/BackArrowIcon';
import { Typography } from '@mui/material';
import { ContainedButton } from '../buttons/ContainedButton/ContainedButton';
import FavoritesShield from '../FavoritesShield/FavoritesShield';
import { getLowestPriceTariffAmount } from '../../utils/getLowestPriceTariffAmount';
import {
  ControlsContainer,
  SearchContainer,
} from '../../styles/reusableStyles';
import { MainWrapper, RecommendationsBox } from './notFoundContentStyles';

const NotFoundContent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: subscriptions } = useAppSelector(
    state => state.allSubscriptions
  );

  useEffect(() => {
    dispatch(fetchSubscriptions({}));
  }, [dispatch]);

  return (
    <>
      <ControlsContainer>
        <Link
          to="/main"
          style={{
            textDecoration: 'none',
            margin: '0',
            padding: 0,
            width: '100%',
          }}
        >
          <BackArrowIcon />
        </Link>
        <SearchContainer>
          <Link
            to=""
            style={{
              textDecoration: 'none',
              display: 'flex',
              justifyContent: 'flex-end',
              margin: 0,
              padding: 0,
            }}
          >
            <SearchIcon />
          </Link>
        </SearchContainer>
      </ControlsContainer>
      <MainWrapper>
        <img src={NotFoundImage} alt="страница не найдена" />
        <Typography
          variant="h2"
          align="center"
          sx={{
            margin: '12px 0 32px',
            width: '80%',
          }}
        >
          К сожалению, мы не нашли такую страницу
        </Typography>
        <ContainedButton
          variant="contained"
          onClick={() => navigate('/main')}
          sx={{
            textTransform: 'none',
            padding: '10px 0',
          }}
        >
          На главную
        </ContainedButton>
        <RecommendationsBox>
          <Typography
            variant="h3"
            align="left"
            sx={{
              margin: '0 0 8px',
              padding: 0,
              boxSizing: 'border-box',
            }}
          >
            Возможно вас заинтересует
          </Typography>
          {subscriptions?.map(sub => (
            <FavoritesShield
              key={sub.id}
              img={sub.image_preview}
              name={sub.name}
              price={getLowestPriceTariffAmount(sub.tariffs)}
              cashback={sub.cashback.amount}
              route={`/subscriptions/${sub.id}`}
            />
          )) ?? []}
        </RecommendationsBox>
      </MainWrapper>
    </>
  );
};

export default NotFoundContent;
