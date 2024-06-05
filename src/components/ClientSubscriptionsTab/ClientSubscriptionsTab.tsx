import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from 'src/store/hooks';
import DetailedSubsShield from '../DetailedSubsShield/DetailedSubsShield';
import { calculateSubscriptionCost } from 'src/utils/costsCalculations/calculateSubscriptionCost';
import { calculateTariffCashback } from 'src/utils/costsCalculations/calculateTariffCashback';
import { AddOneDayFormatted } from 'src/utils/dateManipulations/AddOneDayFormatted';
import { Chip } from '@mui/material';
import CalendarIcon from '../icons/CalendarIcon';
import {
  ChipWrapper,
  IconWrapper,
  StyledTabSection,
} from './clientSubscriptionsTabStyles';
import { maskString } from 'src/utils/maskString';
import { deleteSubscription } from 'src/store/slices/deleteSubscriptionSlice';
import { fetchClientSubscriptions } from 'src/store/slices/clientSubscriptionsSlice';
import { getClientIdFromToken } from 'src/utils/getClientIdFromToken';
import NotificationModal, {
  type NotificationModalProps,
} from '../NotificationModal/NotificationModal';
import { ButtonContainer } from '../TariffAdditionModal/tariffAdditionModalStyles';
import { ContainedButton } from '../buttons/ContainedButton/ContainedButton';
import { OutlinedButton } from '../buttons/OutlinedButton/OutlinedButton';
import { addOneDay } from 'src/utils/dateManipulations/addOneDay';
import {
  handleCheckSubscriptionDeleted,
  handleToggleProlongation,
} from 'src/utils/handleProlongationNotifications';
import NoSubscriptionsTab from '../NoSubscriptionsTab/NoSubscriptionsTab';
import { setFilter } from '../../store/slices/activeTabSlice';

const ClientSubscriptionsTab = () => {
  const dispatch = useAppDispatch();

  const clientId = getClientIdFromToken();

  const { data: clientSubscriptions } = useAppSelector(
    state => state.clientSubscriptions
  );
  const { data: clientById } = useAppSelector(state => state.client);

  const filter = useAppSelector(state => state.tabs.filter);

  const [notificationModalProps, setNotificationModalProps] =
    useState<NotificationModalProps | null>(null);

  useEffect(() => {
    if (!clientId) return;
    const isActive =
      filter === 'active' ? true : filter === 'disabled' ? false : undefined;
    dispatch(fetchClientSubscriptions({ clientId, isActive }));
  }, [dispatch, clientId, filter]);

  return (
    <StyledTabSection>
      <ChipWrapper>
        <Chip
          color={filter === 'active' ? 'primary' : 'default'}
          clickable
          label="Активные"
          variant="outlined"
          onClick={() => dispatch(setFilter(filter === 'active' ? 'all' : 'active'))}
          sx={{
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
            padding: '0 12px',
          }}
        />
        <Chip
          color={filter === 'disabled' ? 'primary' : 'default'}
          label="Неактивные"
          clickable
          variant="outlined"
          onClick={() => dispatch(setFilter(filter === 'disabled' ? 'all' : 'disabled'))}
          sx={{
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
            padding: '0 4px',
          }}
        />
        <IconWrapper>
          <Link
            to={`/me/calendar`}
            style={{ textDecoration: 'none', margin: '0', padding: 0 }}
          >
            <CalendarIcon />
          </Link>
        </IconWrapper>
      </ChipWrapper>
      {!clientById?.subscriptions_count ? (
        <NoSubscriptionsTab />
      ) : (
        clientSubscriptions?.results.map((sub, index: number) => (
          <DetailedSubsShield
            key={index}
            img={sub.subscription.image_preview}
            name={sub.subscription.name}
            tariffName={sub.tariff.name}
            price={calculateSubscriptionCost(sub.tariff)}
            cashbackAmount={calculateTariffCashback(
              sub.tariff,
              sub.cashback_amount
            )}
            cashback={sub.subscription.cashback.amount}
            accountNumber={maskString(
              clientById?.bank_accounts[0]?.number || ''
            )}
            tel={clientById?.phone ?? ''}
            link={
              sub.subscription.subscription_benefits.find(benefit =>
                benefit.benefit.includes('https://')
              )?.benefit || 'значение по умолчанию'
            }
            prolongation={sub.is_auto_pay}
            onChange={async event => {
              const is_auto_pay = event.target.checked;
              if (
                !handleCheckSubscriptionDeleted(
                  sub.deleted_at,
                  is_auto_pay,
                  setNotificationModalProps
                )
              ) {
                return;
              }
              await handleToggleProlongation(
                sub.id,
                is_auto_pay,
                setNotificationModalProps,
                dispatch
              );
            }}
            paymentDate={AddOneDayFormatted(sub.expiration_date)}
            onClick={async () => {
              const newDate = addOneDay(sub.expiration_date);
              const formattedDate = newDate.toLocaleString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              });
              setNotificationModalProps({
                type: 'info',
                title: 'Отключить подписку Okko?',
                message: `Подписка на сервис Okko перестанет действовать c ${formattedDate}`,
                onClose: () => setNotificationModalProps(null),
                actions: (
                  <ButtonContainer>
                    <ContainedButton
                      variant="contained"
                      sx={{
                        textTransform: 'none',
                      }}
                      onClick={() => {
                        setNotificationModalProps(null);
                      }}
                    >
                      Назад
                    </ContainedButton>
                    <OutlinedButton
                      variant="outlined"
                      sx={{
                        textTransform: 'none',
                      }}
                      onClick={async () => {
                        await dispatch(
                          deleteSubscription({ subscription_id: sub.id })
                        );
                        await handleToggleProlongation(
                          sub.id,
                          !sub.is_auto_pay,
                          setNotificationModalProps,
                          dispatch
                        );
                        setNotificationModalProps(null);
                      }}
                    >
                      Отключить
                    </OutlinedButton>
                  </ButtonContainer>
                ),
              });
            }}
            isDisabled={sub.deleted_at !== null}
          />
        ))
      )}

      {notificationModalProps && (
        <NotificationModal {...notificationModalProps} />
      )}
    </StyledTabSection>
  );
};

export default ClientSubscriptionsTab;
