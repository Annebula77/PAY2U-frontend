import { type FC } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface MonthlyPaymentOverviewProps {
  amount: number;
}

const MonthlyPaymentOverview: FC<MonthlyPaymentOverviewProps> = ({
  amount,
}) => {
  return (
    <Card>
      <CardContent
        sx={{
          width: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="h4"
          color="text.secondary"
          align="left"
          sx={{
            width: '60%',
          }}
        >
          Оплата действующих подписок в месяц
        </Typography>
        <Typography variant="h2" color="text.primary" align="center">
          {`${amount} ₽`}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default MonthlyPaymentOverview;
