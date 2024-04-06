import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from 'src/store/hooks';
import { ControlsContainer } from 'src/components/Header/headerStyles';
import { Typography } from '@mui/material';
import SearchIcon from '../icons/SearchIcon';
import BackArrowIcon from '../icons/BackArrowIcon';
import { GradientWrapper } from 'src/styles/reusableStyles';
import MonthlyPaymentOverview from '../MonthlyPaymentOverview/MonthlyPaymentOverview';
import HighlightedCalendar from '../Calendar/Calendar';
import DetailedSubsShield from '../DetailedSubsShield/DetailedSubsShield';
import { useEffect, useState } from 'react';
import { calculateSubscriptionCost } from 'src/utils/calculateSubscriptionCost';
import { calculateTariffCashback } from 'src/utils/calculateTariffCashback';
import { calculatePaymentForCurrentMonth } from 'src/utils/calculatePaymentForCurrentMonth';
import { getProcessedExpirationDates } from 'src/utils/getProcessedExpirationDates';
import { AddOneDayFormatted } from 'src/utils/AddOneDayFormatted';
import {
  CalendarWrapper,
  SearchContainer,
  Wrapper,
} from './calendarContentStyles';
import { maskString } from '../../utils/maskString';
import { deleteSubscription } from '../../store/slices/deleteSubscriptionSlice';
import NotificationModal, {
  type NotificationModalProps,
} from '../NotificationModal/NotificationModal';
import {
  handleCheckSubscriptionDeleted,
  handleToggleProlongation,
} from '../../utils/handleProlongationNotifications';
import { addOneDay } from '../../utils/addOneDay';
import { ButtonContainer } from '../TariffAdditionModal/TariffAdditionModal';
import { ContainedButton } from '../buttons/ContainedButton/ContainedButton';
import { OutlinedButton } from '../buttons/OutlinedButton/OutlinedButton';

const CalendarContent = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { data: clientSubscriptions } = useAppSelector(
    state => state.clientSubscriptions
  );
  const { data: clientById } = useAppSelector(state => state.client);

  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    if (!clientSubscriptions) {
      return;
    }
    const total = calculatePaymentForCurrentMonth(clientSubscriptions);
    setTotalPayment(total);
  }, [clientSubscriptions]);

  let processedDates: Date[] = [];
  if (clientSubscriptions) {
    processedDates = getProcessedExpirationDates(clientSubscriptions);
  }

  const [notificationModalProps, setNotificationModalProps] =
    useState<NotificationModalProps | null>(null);

  return (
    <>
      <GradientWrapper>
        <ControlsContainer>
          <Link
            to="/me"
            style={{ textDecoration: 'none', margin: '0', padding: 0 }}
          >
            <BackArrowIcon />
          </Link>
          <Typography variant="h2" align="left">
            Календарь событий
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
        <CalendarWrapper>
          <MonthlyPaymentOverview amount={totalPayment} />
          <HighlightedCalendar selectedDates={processedDates} />
        </CalendarWrapper>
      </GradientWrapper>
      <Wrapper>
        {clientSubscriptions?.results.map((sub, index: number) => (
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
              clientById?.bank_accounts.at(0)?.number || ''
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
            route="/me"
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
                          deleteSubscription({
                            subscription_id: sub.subscription.id,
                          })
                        );
                        await handleToggleProlongation(
                          sub.id,
                          !sub.is_auto_pay,
                          setNotificationModalProps,
                          dispatch
                        );
                        setNotificationModalProps(null);
                        navigate('/me');
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
        ))}
        {notificationModalProps && (
          <NotificationModal {...notificationModalProps} />
        )}
      </Wrapper>
    </>
  );
};

export default CalendarContent;
