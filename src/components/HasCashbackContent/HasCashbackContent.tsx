import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'src/store/hooks';
import { getMonthInGenitive } from '../../utils/dateManipulations/monthInGenitive';
import CakeImage from 'src/assets/cake.png';
import { Typography } from '@mui/material';
import { fetchSubscriptions } from '../../store/slices/allSubscriptionsSlice';
import FavoritesShield from '../FavoritesShield/FavoritesShield';
import { getLowestPriceTariffAmount } from '../../utils/costsCalculations/getLowestPriceTariffAmount';
import { fetchCashbackHistory } from '../../store/slices/cashbackHistorySlice';
import CashbackShield from '../CashbackShield/CashbackShield';
import { CashbackStatus } from '../../types/CashbackStatusEnum';
import {
  CashbackInfoContainer,
  Logo,
  ShieldContainer,
  StyledSection,
  TextContainer,
} from './hasCashbackContentStyles';

const HasCashbackContent = () => {
  const dispatch = useAppDispatch();
  const newDate = new Date();
  const month = newDate.toLocaleString('ru-RU', { month: 'long' });
  const monthInGenitive = getMonthInGenitive(month);
  const exactDate = newDate.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
  });

  useEffect(() => {
    dispatch(fetchCashbackHistory());
    dispatch(fetchSubscriptions({ ordering: '-cashback__amount' }));
  }, [dispatch]);

  const { data: clientById } = useAppSelector(state => state.client);
  const biggestCashbackSubscriptions = useAppSelector(
    state => state.allSubscriptions.sortByCashbackAmount
  );
  const cashbackHistory = useAppSelector(state => state.cashbackHistory);

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
        variant="h4"
        align="left"
        color="text.secondary"
        sx={{
          textTransform: 'uppercase',
        }}
      >
        {exactDate}
      </Typography>
      <ShieldContainer>
        {cashbackHistory.results.map(cashback => (
          <CashbackShield
            key={cashback.id}
            img={cashback.subscription.image_preview}
            name={cashback.subscription.name}
            invoice={cashback.invoice_id}
            amount={cashback.amount}
            status={cashback.status as CashbackStatus}
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
    </StyledSection>
  );
};
export default HasCashbackContent;
