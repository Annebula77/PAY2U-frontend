import { useAppSelector, useAppDispatch } from 'src/store/hooks';
import { getMonthInGenitive } from '../../utils/dateManipulations/monthInGenitive';
import CakeImage from 'src/assets/cake.png';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ContainedButton } from '../buttons/ContainedButton/ContainedButton';
import { useEffect } from 'react';
import { fetchClientById } from '../../store/slices/clientByIdSlice';
import { fetchSubscriptions } from '../../store/slices/allSubscriptionsSlice';
import FavoritesShield from '../FavoritesShield/FavoritesShield';
import { getLowestPriceTariffAmount } from '../../utils/costsCalculations/getLowestPriceTariffAmount';
import {
  CashbackInfoContainer,
  Logo,
  ShieldContainer,
  StyledSection,
  TextContainer,
} from './noCashbackContentStyles';

const NoCashbackContent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const newDate = new Date();
  const month = newDate.toLocaleString('ru-RU', { month: 'long' });
  const monthInGenitive = getMonthInGenitive(month);

  useEffect(() => {
    dispatch(fetchClientById());
    dispatch(fetchSubscriptions({ ordering: '-popularity' }));
    dispatch(fetchSubscriptions({ ordering: '-cashback__amount' }));
  }, [dispatch]);

  const { data: clientById } = useAppSelector(state => state.client);
  const popularSubscriptions = useAppSelector(
    state => state.allSubscriptions.sortByPopularity
  );
  const biggestCashbackSubscriptions = useAppSelector(
    state => state.allSubscriptions.sortByCashbackAmount
  );

  return (
    <StyledSection>
      <CashbackInfoContainer>
        <Logo src={CakeImage} alt="логотип" />
        <TextContainer>
          <Typography className="textRegular" color="text.primary" align="left">
            {`Начислено в ${monthInGenitive}`}
          </Typography>
          <Typography variant="h1" align="left">
            {clientById?.month_cashback
              ? `${clientById?.month_cashback} ₽`
              : '0 ₽'}
          </Typography>
        </TextContainer>
      </CashbackInfoContainer>
      <Typography
        variant="h1"
        align="left"
        sx={{
          marginBottom: '16px',
        }}
      >
        Как получить?
      </Typography>
      <Typography
        className="textRegular"
        color="text.primary"
        align="left"
        sx={{
          marginBottom: '24px',
        }}
      >
        Выбирайте и подключайте подписки на сервисы! Тематики различные. Кешбэк
        от 3 до 15% от стоимости подписки. Число подписок постоянно
        увеличивается. Если вы пользуетесь сервисами постоянно, то вы можете
        подключить их дешевле и получать выгоду c каждой оплаты.
      </Typography>
      <ContainedButton
        type="submit"
        variant="contained"
        onClick={() => navigate('/me')}
        sx={{
          textTransform: 'none',
          padding: '8px 0 8px',
          marginBottom: '12px',
        }}
      >
        Выбрать подписку
      </ContainedButton>
      <ShieldContainer>
        <Typography
          variant="h2"
          align="left"
          sx={{
            marginBottom: '12px',
          }}
        >
          Наибольший кешбэк предлагают
        </Typography>
        {biggestCashbackSubscriptions.slice(0, 2).map((sub, index: number) => (
          <FavoritesShield
            key={index}
            img={sub.image_preview}
            name={sub.name}
            price={getLowestPriceTariffAmount(sub.tariffs)}
            cashback={sub.cashback.amount}
            route={`/me/subscriptions/${sub.id}`}
          />
        ))}
      </ShieldContainer>
      <ShieldContainer>
        <Typography
          variant="h2"
          align="left"
          sx={{
            marginBottom: '12px',
          }}
        >
          Самые популярные сервисы
        </Typography>
        {popularSubscriptions.slice(0, 2).map((sub, index: number) => (
          <FavoritesShield
            key={index}
            img={sub.image_preview}
            name={sub.name}
            price={getLowestPriceTariffAmount(sub.tariffs)}
            cashback={sub.cashback.amount}
            route={`/me/subscriptions/${sub.id}`}
          />
        ))}
      </ShieldContainer>
    </StyledSection>
  );
};
export default NoCashbackContent;
