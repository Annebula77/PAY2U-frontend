import { type FC } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  CashBackBox,
  Logo,
  LogoContainer,
  StyledDiv,
  UpperTextBox,
} from './CatalogueShieldStyles';

interface CatalogueShieldProps {
  img: string;
  name: string;
  price: number;
  cashback: string;
  route: string;
}

const CatalogueShield: FC<CatalogueShieldProps> = ({
  img,
  name,
  price,
  cashback,
  route,
}) => {
  return (
    <Card sx={{ width: '160px', height: '104px', margin: '10px' }}>
      <Link
        to={route}
        style={{ textDecoration: 'none', width: '100%', margin: 0, padding: 0 }}
      >
        <CardContent
          sx={{
            width: '160px',
            height: '104px',
            boxSizing: 'border-box',
            p: '10px 8px 10px ',
            m: 0,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <LogoContainer>
            <Logo src={img} alt="service image" />
            <Typography
              className="textSmallBold"
              color="text.primary"
              align="left"
            >
              {name}
            </Typography>
          </LogoContainer>
          <StyledDiv>
            <UpperTextBox>
              <Typography
                className="textCard"
                color="text.primary"
                align="right"
              >{`От ${price} ₽`}</Typography>
              <Typography
                className="textSmallRegular"
                color="text.secondary"
                align="right"
              >
                в месяц
              </Typography>
            </UpperTextBox>
            <CashBackBox>
              <Typography
                className="textSmallMedium"
                color="primary.main"
                align="center"
              >{`кешбэк ${cashback}%`}</Typography>
            </CashBackBox>
          </StyledDiv>
        </CardContent>
      </Link>
    </Card>
  );
};
export default CatalogueShield;
