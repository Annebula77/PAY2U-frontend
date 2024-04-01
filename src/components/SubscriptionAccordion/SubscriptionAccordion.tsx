import { type FC } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { type SubscriptionContentProps } from '../SubscriptionContent/SubscriptionContent';
import TariffShield from '../TariffShield/TariffShield';
import styled from 'styled-components';
import { resetBox } from 'src/styles/mixIns';

const TariffContainer = styled.div`
  ${resetBox()}
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SubscriptionAccordion: FC<SubscriptionContentProps> = ({
  subscription,
}) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h3" color="textPrimary" align="left">
          Условия
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ gap: '12px' }}>
        <Typography
          variant="h2"
          color="textPrimary"
          align="left"
          sx={{ marginBottom: '16px' }}
        >
          Выберите тариф
        </Typography>
        <TariffContainer>
          {subscription.tariffs.map(tariff => (
            <TariffShield
              key={tariff.id}
              name={tariff.name}
              amount={tariff.amount}
              cashback={subscription.cashback.amount.toString()}
              period={tariff.days_amount}
              route={`/buy/${tariff.id}`}
            />
          ))}
        </TariffContainer>
      </AccordionDetails>
    </Accordion>
  );
};

export default SubscriptionAccordion;
