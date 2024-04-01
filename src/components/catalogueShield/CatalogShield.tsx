import { type FC } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MockLogo from 'src/assets/mockIcon.png';
import { resetBox } from 'src/styles/mixIns';

interface CatalogueShieldProps {
  img: string;
  name: string;
  price: number;
  cashback: string;
  route: string;
}

const StyledDiv = styled.div`
  ${resetBox()};
  display: flex;
  flex-direction: column;
  align-content: flex-end;
  width: 62%;
  gap: 40px;
`;

const UpperTextBox = styled.div`
  ${resetBox()};
  display: flex;
  flex-direction: column;
  align-content: flex-end;
  justify-content: flex-start;
`;

const LogoContainer = styled.div`
  width: 60%;
  ${resetBox()};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

const Logo = styled.img`
  display: inline-block;
  width: 40px;
  height: 40px;
  padding: 0;
  margin: 0;
`;

const CashBackBox = styled.div`
  ${resetBox()};
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

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
            <Logo src={img ? img : MockLogo} alt="service image" />
            <Typography
              className="textSmallBold"
              color="text.primary"
              align="left"
            >
              {name ? name : 'КРУТО-ТВ'}
            </Typography>
          </LogoContainer>
          <StyledDiv>
            <UpperTextBox>
              <Typography
                className="textCard"
                color="text.primary"
                align="right"
              >{`От ${price ? price : '279'}₽`}</Typography>
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
              >{`кешбэк ${cashback ? cashback : '10'}%`}</Typography>
            </CashBackBox>
          </StyledDiv>
        </CardContent>
      </Link>
    </Card>
  );
};
export default CatalogueShield;
