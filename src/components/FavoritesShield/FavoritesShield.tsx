import { type FC } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  CashBackBox,
  Logo,
  LogoContainer,
  StyledDiv,
  UpperTextBox,
} from './FavoritesShieldStyles';

interface FavoritesShieldProps {
  img: string;
  name: string;
  price: number;
  cashback: number;
  route: string;
}

const FavoritesShield: FC<FavoritesShieldProps> = ({
  img,
  name,
  price,
  cashback,
  route,
}) => {
  return (
    <Card sx={{ width: '343px', height: '94px', margin: '0' }}>
      <Link
        to={route}
        style={{ textDecoration: 'none', width: '100%', margin: 0, padding: 0 }}
      >
        <CardContent
          sx={{
            width: '343px',
            height: '94px',
            boxSizing: 'border-box',
            p: '12px',
            m: 0,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <StyledDiv>
            <LogoContainer>
              <Logo src={img} alt="service image" />
              <UpperTextBox>
                <Typography
                  variant="h4"
                  color="text.primary"
                  align="left"
                >{`От ${price} ₽`}</Typography>
                <Typography
                  className="textRegular"
                  color="text.secondary"
                  align="left"
                >
                  в месяц
                </Typography>
              </UpperTextBox>
            </LogoContainer>
            <Typography variant="h3" color="text.primary" align="left">
              {name}
            </Typography>
          </StyledDiv>
          <CashBackBox>
            <Typography
              className="textCardH1"
              color="primary.main"
              align="left"
            >{`кешбэк ${cashback}%`}</Typography>
          </CashBackBox>
        </CardContent>
      </Link>
    </Card>
  );
};
export default FavoritesShield;
