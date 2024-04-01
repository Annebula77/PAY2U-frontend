import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import SubscriptionContent from 'src/components/SubscriptionContent/SubscriptionContent';
import { StyledSection } from '../styles/pageAndOnboardingStyles';
import { fetchSingleSubscription } from 'src/store/slices/singleSubscriptionSlice';
import { ControlsContainer, SearchContainer } from './CookiesPage';
import { Link } from 'react-router-dom';
import BackArrowIcon from 'src/components/icons/BackArrowIcon';
import { Typography } from '@mui/material';
import SearchIcon from 'src/components/icons/SearchIcon';
import styled from 'styled-components';
import { resetBox } from 'src/styles/mixIns';

export const NameContainer = styled.div`
  width: 58%;
  ${resetBox()};
  display: flex;
  justify-content: flex-start;
`;

const SubscriptionPage = () => {
  const { subscription_id } = useParams<{ subscription_id: string }>();
  const subscriptionIdNum = subscription_id
    ? parseInt(subscription_id, 10)
    : null;
  const dispatch = useAppDispatch();

  const subscription = useAppSelector(state =>
    state.allSubscriptions.data.find(sub => sub.id === subscriptionIdNum)
  );

  useEffect(() => {
    if (subscriptionIdNum !== null && !subscription) {
      dispatch(fetchSingleSubscription(subscriptionIdNum));
    }
  }, [dispatch, subscription_id, subscription, subscriptionIdNum]);

  if (!subscription) {
    // NOTE: можно отобразить загрузку или сделать редирект, если подписка не найдена
    return <div>Loading...</div>;
  }
  return (
    <StyledSection>
      <ControlsContainer>
        <NameContainer>
          <Link
            to="/main"
            style={{ textDecoration: 'none', margin: '0', padding: 0 }}
          >
            <BackArrowIcon />
          </Link>
          <Typography variant="h2" align="left">
            {subscription.name}
          </Typography>
        </NameContainer>
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
      <SubscriptionContent subscription={subscription} />
    </StyledSection>
  );
};

export default SubscriptionPage;
