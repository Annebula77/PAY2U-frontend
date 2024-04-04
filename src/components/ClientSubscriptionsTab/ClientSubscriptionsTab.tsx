import { useAppSelector } from 'src/store/hooks';
import DetailedSubsShield from '../DetailedSubsShield/DetailedSubsShield';
import { calculateSubscriptionCost } from 'src/utils/calculateSubscriptionCost';
import { calculateTariffCashback } from 'src/utils/calculateTariffCashback';
import { AddOneDayFormatted } from '../../utils/AddOneDayFormatted';
import { Chip } from '@mui/material';
import CalendarIcon from '../icons/CalendarIcon';
import { Link } from 'react-router-dom';
import { getClientIdFromToken } from '../../utils/getClientIdFromToken';
import { useState } from 'react';
import { ChipWrapper, IconWrapper, StyledTabSection } from './clientSubscriptionsTabStyles';



const ClientSubscriptionsTab = () => {

  const { data: clientSubscriptions } = useAppSelector(state => state.clientSubscriptions);
  const { data: clientById } = useAppSelector(state => state.client);

  const clientId = getClientIdFromToken();

  const [filter, setFilter] = useState('all');

  const showActive = () => setFilter('active');
  const showDisabled = () => setFilter('disabled');

  const filteredSubscriptions = clientSubscriptions?.results.filter(sub => {
    if (filter === 'active') return sub.is_active && sub.deleted_at === null;
    if (filter === 'disabled') return sub.deleted_at !== null;
    return true;
  });

  return (
    <StyledTabSection>
      <ChipWrapper>
        <Chip
          color={filter === 'active' ? 'primary' : 'default'}
          clickable
          label="Активные"
          variant="outlined"
          onClick={showActive}
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
          onClick={showDisabled}
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
            to={`/clients/${clientId}/calendar`}
            style={{ textDecoration: 'none', margin: '0', padding: 0 }}
          >
            <CalendarIcon />
          </Link>
        </IconWrapper>
      </ChipWrapper>
      {filteredSubscriptions?.map(sub => (
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
    </StyledTabSection>
  );
};

export default ClientSubscriptionsTab;
