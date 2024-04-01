import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Typography } from '@mui/material';
import BackArrowIcon from '../icons/BackArrowIcon';
import styled from 'styled-components';
import SearchIcon from '../icons/SearchIcon';
import Slider from '../Slider/Slider';
import RecommendedShield from '../RecommendedShield/RecommendedShield';
import NoSubsShield from '../NoSubsShield/NoSubsShield';
import HasSubsShield from '../HasSubsShield/HasSubsShield';
import { GeneralModal } from '../GeneralModal/GeneralModal';
import { Link } from 'react-router-dom';
import { resetBox } from 'src/styles/mixIns';
import { useState } from 'react';
import HowItWorksContent from '../HowItWorksContent/HowItWorksContent';
import { fetchSubscriptions } from 'src/store/slices/allSubscriptionsSlice';
import { fetchClientById } from 'src/store/slices/clientByIdSlice';
import { fetchClientSubscriptions } from 'src/store/slices/clientSubscriptionsSlice';

const HeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 0;
  background: ${({ theme }) => theme.custom.header};
  padding: 60px 16px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  gap: 20px;
`;

const ControlsContainer = styled.nav`
  width: 100%;
  margin: 0 0 24px;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 10px;
`;
const SearchContainer = styled.div`
  width: 55%;
  ${resetBox()};
  display: flex;
  justify-content: flex-end;
`;

const MySubsContainer = styled.article`
  width: 100%;
  ${resetBox()};
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SubsRow = styled.div`
  width: 100%;
  ${resetBox()};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

const TextButton = styled.button`
  ${resetBox()};
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

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
    const isLiked = false;
    const isActive = true;
    // NOTE: хардкод, так как авторизация не реализовывалась.
    dispatch(fetchClientById(1));
    dispatch(fetchSubscriptions({ recommended: true }));
    dispatch(fetchClientSubscriptions({ clientId: 1, isActive, isLiked }));
  }, [dispatch]);
  const [showModal, setShowModal] = useState(false);

  // NOTE: перенести функцию в utils
  const activeSubscriptions = clientSubscriptions?.results
    .filter(sub => sub.is_active)
    .sort(
      (a, b) =>
        new Date(a.expiration_date).getTime() -
        new Date(b.expiration_date).getTime()
    );

  if (!activeSubscriptions) {
    return 0;
  }

  const nextSubscription = activeSubscriptions[0];

  if (!nextSubscription) {
    return;
  }
  const expirationDate = new Date(nextSubscription?.expiration_date);
  if (isNaN(expirationDate.getTime())) {
    console.error('Невалидная дата:', nextSubscription?.expiration_date);
    return;
  }

  // ***/

  const formattedDate = expirationDate.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
  });
  const amount = nextSubscription?.tariff.amount;

  return (
    <HeaderWrapper>
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
        slides={subscriptions.map(subscription => (
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
        <TextButton type="button" onClick={() => setShowModal(true)}>
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
        </TextButton>
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
    </HeaderWrapper>
  );
};
export default Header;
