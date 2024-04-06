import { type ChangeEvent, type FC } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import DetailedSubsShieldAccordion from '../DetailedSubsShieldAccordion/DetailedSubsShieldAccordion';
import {
  CashBackBox,
  Logo,
  LogoContainer,
  MainContainer,
  StyledDiv,
  UpperTextBox,
} from './detailedSubsShieldStyles';

export interface DetailedSubsShieldProps {
  img: string;
  name: string;
  tariffName: string;
  paymentDate: string;
  price: number;
  cashbackAmount: number;
  cashback: number;
  accountNumber: string;
  tel: string;
  link: string;
  prolongation: boolean;
  route: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  onClick: () => void;
  isDisabled: boolean;
}

const DetailedSubsShield: FC<DetailedSubsShieldProps> = ({
  img,
  name,
  tariffName,
  price,
  cashback,
  accountNumber,
  tel,
  link,
  prolongation,
  route,
  paymentDate,
  onChange,
  cashbackAmount,
  onClick,
  isDisabled,
}) => {
  return (
    <Card sx={{ width: '343px', margin: '0' }}>
      <CardContent
        sx={{
          width: '343px',

          boxSizing: 'border-box',
          p: '12px',
          m: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MainContainer>
          <StyledDiv>
            <LogoContainer>
              <Logo src={img} alt="service image" />
              <UpperTextBox>
                <Typography
                  variant="h4"
                  color="text.primary"
                  align="left"
                >{`${price} ₽`}</Typography>
                <Typography
                  className="textRegular"
                  color="text.secondary"
                  align="left"
                >
                  {`за ${tariffName}`}
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
              align="right"
            >{`кешбэк ${cashback}%`}</Typography>
          </CashBackBox>
        </MainContainer>
        <DetailedSubsShieldAccordion
          price={price}
          cashbackAmount={cashbackAmount}
          accountNumber={accountNumber}
          tel={tel}
          link={link}
          prolongation={prolongation}
          onChange={onChange}
          route={route}
          paymentDate={paymentDate}
          onClick={onClick}
          isDisabled={isDisabled}
        />
      </CardContent>
    </Card>
  );
};
export default DetailedSubsShield;
