import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from 'src/store/hooks';
import DetailedSubsShield from '../DetailedSubsShield/DetailedSubsShield';
import { calculateSubscriptionCost } from 'src/utils/calculateSubscriptionCost';
import { calculateTariffCashback } from 'src/utils/calculateTariffCashback';
import { AddOneDayFormatted } from '../../utils/AddOneDayFormatted';
import { Chip } from '@mui/material';
import CalendarIcon from '../icons/CalendarIcon';
import { Link } from 'react-router-dom';
import {
  ChipWrapper,
  IconWrapper,
  StyledTabSection,
} from './clientSubscriptionsTabStyles';
import { maskString } from '../../utils/maskString';
import { deleteSubscription } from '../../store/slices/deleteSubscriptionSlice';
import { toggleProlongation } from '../../store/slices/prolongationSlice';
import { fetchClientSubscriptions } from '../../store/slices/clientSubscriptionsSlice';
import { getClientIdFromToken } from '../../utils/getClientIdFromToken';

const ClientSubscriptionsTab = () => {
  const dispatch = useAppDispatch();

  const clientId = getClientIdFromToken();

  const { data: clientSubscriptions } = useAppSelector(
    state => state.clientSubscriptions
  );
  const { data: clientById } = useAppSelector(state => state.client);

  const [filter, setFilter] = useState('all');

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
          onClick={() => setFilter('active')}
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
          onClick={() => setFilter('disabled')}
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
      {clientSubscriptions?.results.map(sub => (
        <DetailedSubsShield
          key={sub.subscription.id}
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
            const subscription_id = sub.id;
            const is_auto_pay = event.target.checked;
            // NOTE: очень временное решение, переделать
            if (sub.deleted_at !== null) {
              alert('Вы не можете продлять удаленную подписку');
              return;
            }
            await dispatch(
              toggleProlongation({ subscription_id, is_auto_pay })
            );
            if (clientId) {
              await dispatch(fetchClientSubscriptions({ clientId }));
            }
          }}
          route="/me"
          paymentDate={AddOneDayFormatted(sub.expiration_date)}
          onClick={() =>
            dispatch(deleteSubscription({ subscription_id: sub.id }))
          }
          isDisabled={sub.deleted_at !== null}
        />
      ))}
    </StyledTabSection>
  );
};

export default ClientSubscriptionsTab;
