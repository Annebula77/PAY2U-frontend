import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
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
import { fetchClientById } from 'src/store/slices/clientByIdSlice';
import { fetchClientSubscriptions } from 'src/store/slices/clientSubscriptionsSlice';
import { getNearestPaymentDate } from 'src/utils/getNearestPaymentDate';
import { GradientWrapper, InvisibleButton } from 'src/styles/reusableStyles';
import {
  ControlsContainer,
  MySubsContainer,
  SearchContainer,
  SubsRow,
} from './headerStyles';

const Header = () => {
  const dispatch = useAppDispatch();
  const { data: client } = useAppSelector(state => state.client);
  const { data: subscriptions } = useAppSelector(
    state => state.allSubscriptions
  );
  const { data: clientSubscriptions } = useAppSelector(
    state => state.clientSubscriptions
  );

  useEffect(() => {
    const isActive = true;
    // NOTE: хардкод, так как авторизация не реализовывалась.
    dispatch(fetchClientById(1));
    dispatch(fetchSubscriptions({ recommended: true }));
    dispatch(fetchClientSubscriptions({ clientId: 1, isActive }));
  }, [dispatch]);
  const [showModal, setShowModal] = useState(false);

  const nextSubscription = getNearestPaymentDate(
    clientSubscriptions?.results || []
  );

  let formattedDate = '';
  let amount = 0;

  if (nextSubscription) {
    const expirationDate = new Date(nextSubscription.expiration_date);
    formattedDate = expirationDate.toLocaleString('ru-RU', {
      day: 'numeric',
      month: 'long',
    });
    amount = nextSubscription.tariff.amount;
  }

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
        slides={subscriptions
          .filter(subscription => subscription.is_recommended)
          .map(subscription => (
            <RecommendedShield
              key={subscription.id}
              img={subscription.image_preview}
              title={subscription.name}
              cashback={`${subscription.cashback.amount}`}
              route={`/subscriptions/${subscription.id}`}
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
            to=""
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
            to=""
            style={{
              textDecoration: 'none',
              width: '100%',
              margin: 0,
              padding: 0,
            }}
          >
            {nextSubscription ? (
              <HasSubsShield
                stats={amount}
                name="Ближайшее списание"
                showCurrencySymbol
                date={formattedDate}
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
