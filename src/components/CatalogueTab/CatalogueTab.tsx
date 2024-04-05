import { useEffect } from 'react';
import { Paper } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import styled from 'styled-components';
import Slider from '../Slider/Slider';
import CatalogueShield from '../CatalogueShield/CatalogShield';
import { fetchCategoryList } from 'src/store/slices/categoriesSlice';
import { fetchSubscriptions } from 'src/store/slices/allSubscriptionsSlice';
import { getLowestPriceTariffAmount } from 'src/utils/getLowestPriceTariffAmount';

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
  const dispatch = useAppDispatch();
  const { data: categories } = useAppSelector(state => state.categories);
  const { data: subscriptions } = useAppSelector(
    state => state.allSubscriptions
  );

  useEffect(() => {
    dispatch(fetchCategoryList());
    dispatch(fetchSubscriptions({}));
  }, [dispatch]);

  const preparedSlides = categories
    .map(category => {
      return subscriptions
        .filter(sub => sub.category.id === category.id)
        .map(subscription => ({
          ...subscription,
          lowestPrice: getLowestPriceTariffAmount(subscription.tariffs),
        }));
    })
    .flat();

  return (
    <StyledTabSection>
      {categories.map(category => (
        <Paper
          key={category.id}
          sx={{
            maxWidth: '100%',
            padding: '20px 8px 20px',
            boxSizing: 'border-box',
          }}
        >
          <Slider
            slides={preparedSlides
              .filter(sub => sub.category.id === category.id)
              .map(subscription => (
                <CatalogueShield
                  key={subscription.id}
                  img={subscription.image_preview}
                  price={subscription.lowestPrice}
                  cashback={`${subscription.cashback.amount}`}
                  route={`/me/subscriptions/${subscription.id}`}
                  name={subscription.name}
                />
              ))}
            title={category.name}
            slidePerView="2.5"
            showNextButton
            spaceBetween="90"
          />
        </Paper>
      ))}
    </StyledTabSection>
  );
};

export default CatalogueTab;
