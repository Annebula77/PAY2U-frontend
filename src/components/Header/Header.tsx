import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { Typography } from '@mui/material';
import BackArrowIcon from '../icons/BackArrowIcon';
import SearchIcon from '../icons/SearchIcon';
import Slider from '../Slider/Slider';
import RecommendedShield from '../RecommendedShield/RecommendedShield';
import NoSubsShield from '../NoSubsShield/NoSubsShield';
import HasSubsShield from '../HasSubsShield/HasSubsShield';
import { GeneralModal } from '../GeneralModal/GeneralModal';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import HowItWorksContent from '../HowItWorksContent/HowItWorksContent';
import { fetchSubscriptions } from 'src/store/slices/allSubscriptionsSlice';
import { getNearestPaymentDate } from 'src/utils/dateManipulations/getNearestPaymentDate';
import { GradientWrapper, InvisibleButton } from 'src/styles/reusableStyles';
import { AddOneDayFormatted } from 'src/utils/dateManipulations/AddOneDayFormatted';
import { fetchClientById } from 'src/store/slices/clientByIdSlice';
import {
  ControlsContainer,
  MySubsContainer,
  SearchContainer,
  SubsRow,
} from './headerStyles';
import { getClientIdFromToken } from '../../utils/getClientIdFromToken';
import { fetchClientSubscriptions } from '../../store/slices/clientSubscriptionsSlice';

const Header = () => {
  const dispatch = useAppDispatch();

  const clientId = getClientIdFromToken();

  const { data: client } = useAppSelector(state => state.client);
  const recommendedSubscriptions = useAppSelector(
    state => state.allSubscriptions.recommendedData
  );
  const { data: clientSubscriptions } = useAppSelector(
    state => state.clientSubscriptions
  );

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!clientId) {
      return;
    }
    dispatch(fetchClientSubscriptions({ clientId }));
    dispatch(fetchClientById());
    dispatch(fetchSubscriptions({ recommended: true }));
  }, [dispatch, clientId]);

  const nextSubscription = getNearestPaymentDate(
    clientSubscriptions?.results || []
  );

  const amount = nextSubscription?.tariff.amount;

  return (
    <GradientWrapper>
      <ControlsContainer>
        <Link
          to="/"
          style={{ textDecoration: 'none', margin: '0', padding: 0 }}
        >
          <BackArrowIcon />
        </Link>
        <Typography variant="h2" align="left">
          Подписки
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
      <Slider
        slides={recommendedSubscriptions.map(subscription => (
          <RecommendedShield
            key={subscription.id}
            img={subscription.image_preview}
            title={subscription.name}
            cashback={`${subscription.cashback.amount}`}
            route={`/me/subscriptions/${subscription.id}`}
          />
        ))}
        title="Рекомендации"
        slidePerView="3.5"
      />
      <MySubsContainer>
        <Typography variant="h1" color="text.primary" align="left">
          Мои подписки
        </Typography>
        <SubsRow>
          <Link
            to=""
            style={{
              textDecoration: 'none',
              width: '48.5%',
              margin: 0,
              padding: 0,
            }}
          >
            {client?.subscriptions_count ? (
              <HasSubsShield
                stats={client?.subscriptions_count}
                name="Активных"
              />
            ) : (
              <NoSubsShield
                title="Нет активных"
                text="Выберете подходящие
              в каталоге"
              />
            )}
          </Link>
          <Link
            to="/me/cashback"
            style={{
              textDecoration: 'none',
              width: '48.5%',
              margin: 0,
              padding: 0,
            }}
          >
            {client?.month_cashback ? (
              <HasSubsShield
                stats={client?.month_cashback}
                name="Кешбэк "
                showCurrencySymbol
              />
            ) : (
              <NoSubsShield
                title="Кешбэк"
                text="Начислим после
              подключения"
              />
            )}
          </Link>
          <Link
            to={`/me/calendar`}
            style={{
              textDecoration: 'none',
              width: '100%',
              margin: 0,
              padding: 0,
            }}
          >
            {nextSubscription ? (
              <HasSubsShield
                stats={amount || 0}
                name="Ближайшее списание"
                showCurrencySymbol
                date={AddOneDayFormatted(nextSubscription.expiration_date)}
              />
            ) : (
              <NoSubsShield
                title="Ближайшее списание"
                text="Нет активных подписок"
              />
            )}
          </Link>
        </SubsRow>
        <InvisibleButton type="button" onClick={() => setShowModal(true)}>
          <Typography
            className="textRegular"
            color="primary.main"
            align="right"
            sx={{
              marginTop: '-8px',
              marginBottom: '20px',
            }}
          >
            Как работает?
          </Typography>
        </InvisibleButton>
      </MySubsContainer>
      {showModal && (
        <GeneralModal
          onClose={() => {
            setShowModal(false);
          }}
          showCloseButton
        >
          <HowItWorksContent />
        </GeneralModal>
      )}
    </GradientWrapper>
  );
};
export default Header;
