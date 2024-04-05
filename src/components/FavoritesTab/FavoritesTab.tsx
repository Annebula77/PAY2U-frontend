import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import styled from 'styled-components';
import FavoritesShield from '../FavoritesShield/FavoritesShield';
import { getLowestPriceTariffAmount } from 'src/utils/getLowestPriceTariffAmount';
import { fetchFavoriteSubscriptions } from 'src/store/slices/favoriteSubscriptionsSlice';
import NoFavoritesTab from '../NoFavoritesTab/NoFavoritesTab';

const StyledTabSection = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FavoritesTab = () => {
  const dispatch = useAppDispatch();

  const { data: favorites } = useAppSelector(state => state.favorites);

  useEffect(() => {
    dispatch(fetchFavoriteSubscriptions());
  }, [dispatch]);

  if (!favorites || favorites.length === 0) {
    return <NoFavoritesTab />;
  }

  return (
    <StyledTabSection>
      {favorites.map(fav => (
        <FavoritesShield
          key={fav.subscription.id}
          img={fav.subscription.image_preview}
          name={fav.subscription.name}
          price={getLowestPriceTariffAmount(fav.subscription.tariffs)}
          cashback={fav.subscription.cashback.amount}
          route={`/me/subscriptions/${fav.subscription.id}`}
        />
      ))}
    </StyledTabSection>
  );
};

export default FavoritesTab;
