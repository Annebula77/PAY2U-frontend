import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'src/store/hooks';
import styled from 'styled-components';
import Waiting from 'src/assets/Waiting.png';
import { fetchSubscriptions } from '../../store/slices/allSubscriptionsSlice';
import FavoritesShield from '../FavoritesShield/FavoritesShield';
import { getLowestPriceTariffAmount } from '../../utils/costsCalculations/getLowestPriceTariffAmount';
import { ShieldContainer } from '../NoCashbackContent/noCashbackContentStyles';
import { Typography } from '@mui/material';

const StyledTabSection = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 0 0 235px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const ImageContainer = styled.div`
  box-sizing: border-box;
  width: 77px;
  height: 78px;
  margin: 0;
  padding: 0;
`;

const NoSubscriptionsTab = () => {

  const dispatch = useAppDispatch();

  const recommendedSubscriptions = useAppSelector(
    state => state.allSubscriptions.recommendedData
  );

  useEffect(() => {
    dispatch(fetchSubscriptions({ recommended: true }));
  }, [dispatch]);


  return (
    <StyledTabSection>
      <ImageContainer>
        <img src={Waiting} alt="нет подписок" />
      </ImageContainer>
      <Typography
        variant='h4'
        color="text.primary"
        align="center"
        sx={{
          width: '90%',
        }}
      >
        Ждём, когда вы подпишитесь
      </Typography>
      <ShieldContainer>
        <Typography
          variant="h2"
          align="left"
          sx={{
            marginBottom: '12px',
          }}
        >
          Возможно вас заинтересуют
        </Typography>
        {recommendedSubscriptions.slice(0, 5).map((sub, index: number) => (
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
    </StyledTabSection>
  );
};

export default NoSubscriptionsTab;
