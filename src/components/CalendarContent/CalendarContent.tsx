import { Link } from 'react-router-dom';
import { useAppSelector } from 'src/store/hooks';
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
import { CalendarWrapper, SearchContainer, Wrapper } from './calendarContentStyles';

const CalendarContent = () => {

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

  return (
    <>
      <GradientWrapper>
        <ControlsContainer>
          <Link
            to="/main"
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
        {clientSubscriptions?.results.map(sub => (
          <DetailedSubsShield
            key={sub.subscription.id}
            img={sub.subscription.image_preview}
            name={sub.subscription.name}
            tariffName={sub.tariff.name}
            price={calculateSubscriptionCost(sub.tariff)}
            cashbackAmount={calculateTariffCashback(sub.tariff, sub.cashback_amount)}
            cashback={sub.subscription.cashback.amount}
            // NOTE: добавить charge_account
            accountNumber="*** 3456"
            tel={clientById?.phone ?? ''}
            link={
              sub.subscription.subscription_benefits.find(benefit =>
                benefit.benefit.includes('https://')
              )?.benefit || 'значение по умолчанию'
            }
            prolongation={sub.is_auto_pay}
            route="/main"
            paymentDate={AddOneDayFormatted(sub.expiration_date)}
          />
        ))}
      </Wrapper>
    </>
  );
};

export default CalendarContent;
