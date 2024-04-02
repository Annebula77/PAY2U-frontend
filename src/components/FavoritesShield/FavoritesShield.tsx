import { type FC } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { resetBox } from 'src/styles/mixIns';

interface FavoritesShieldProps {
  img: string;
  name: string;
  price: number;
  cashback: number;
  route: string;
}

const StyledDiv = styled.div`
  ${resetBox()};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
  gap: 8px;
`;

const UpperTextBox = styled.div`
  ${resetBox()};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: center;
`;

const LogoContainer = styled.div`
  ${resetBox()};
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 8px;
`;

const Logo = styled.img`
  display: inline-block;
  width: 40px;
  height: 40px;
  padding: 0;
  margin: 0;
  border-radius: 12px;
  object-fit: contain;
`;

const CashBackBox = styled.div`
  ${resetBox()};
  width: 30%;
  display: flex;
  justify-content: center;
`;

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
            height: '104px',
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
