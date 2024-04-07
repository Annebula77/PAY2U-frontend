import { type FC } from 'react';
import { Card, CardContent, Chip, Typography } from '@mui/material';
import {
  LowerBox,
  NameContainer,
  StyledDiv,
  UpperTextBox,
} from './tariffShieldStyles';
import { calculateSubscriptionCost } from 'src/utils/costsCalculations/calculateSubscriptionCost';

interface TariffShieldProps {
  name: string;
  amount: number;
  cashback: string;
  period: number;
}

const TariffShield: FC<TariffShieldProps> = ({
  name,
  amount,
  cashback,
  period,
}) => {
  return (
    <Card sx={{ width: '343px' }}>
      <CardContent
        sx={{
          width: '100%',
          height: '100%',
          boxSizing: 'border-box',
          p: '16px 16px 0',
          m: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '22px',
        }}
      >
        <NameContainer>
          <Typography
            className="textCardH1"
            color="text.primary"
            align="left"
          >{`Подписка на ${name}`}</Typography>
          <Chip label={`кешбэк ${cashback}%`} color="primary" />
        </NameContainer>
        <StyledDiv>
          <UpperTextBox>
            <Typography
              className="priceCard"
              color="text.primary"
              align="left"
            >{`${amount} ₽`}</Typography>
            <Typography
              className="textCard"
              color="text.secondary"
              align="right"
            >
              за месяц
            </Typography>
          </UpperTextBox>
          <LowerBox>
            <Typography
              className="textCard"
              color="text.secondary"
              align="right"
              sx={{
                margin: 0,
                padding: 0,
              }}
            >{`при разовой оплате ${calculateSubscriptionCost({ amount: amount, days_amount: period })} ₽ за ${name}`}</Typography>
          </LowerBox>
        </StyledDiv>
      </CardContent>
    </Card>
  );
};
export default TariffShield;
