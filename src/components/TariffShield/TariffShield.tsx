import { type FC } from 'react';
import { Card, CardContent, Chip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  LowerBox,
  NameContainer,
  StyledDiv,
  UpperTextBox,
} from './tariffShieldStyles';

interface TariffShieldProps {
  name: string;
  amount: number;
  cashback: string;
  period: number;
  route: string;
}

const TariffShield: FC<TariffShieldProps> = ({
  name,
  amount,
  cashback,
  period,
  route,
}) => {
  const amountToPay = () => {
    return (amount / 30) * period;
  };

  return (
    <Card sx={{ width: '343px' }}>
      <Link
        to={route}
        style={{ textDecoration: 'none', width: '100%', margin: 0, padding: 0 }}
      >
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
            >{`Подписка на ${name ? name : '1 месяц'}`}</Typography>
            <Chip
              label={`кешбэк ${cashback ? cashback : '10'}%`}
              color="primary"
            />
          </NameContainer>
          <StyledDiv>
            <UpperTextBox>
              <Typography
                className="priceCard"
                color="text.primary"
                align="left"
              >{`${amount ? amount : '199'} ₽`}</Typography>
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
              >{`при разовой оплате ${amountToPay()} ₽ за ${name}`}</Typography>
            </LowerBox>
          </StyledDiv>
        </CardContent>
      </Link>
    </Card>
  );
};
export default TariffShield;
