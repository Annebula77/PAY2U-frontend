import { type FC } from 'react';
import { Card, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Logo, LogoWrapper, TextContainer } from './recommendedShieldStyles';

interface ShieldProps {
  img: string;
  title: string;
  cashback: string;
  route: string;
}

const RecommendedShield: FC<ShieldProps> = ({
  img,
  title,
  cashback,
  route,
}) => {
  return (
    <Link to={route} style={{ textDecoration: 'none', width: '100%' }}>
      <Card
        sx={{
          width: '88px',
          height: '126px',
          margin: '10px 0 0',
          backgroundColor: 'transparent',
          outline: 'none',
          boxShadow: 'none',
        }}
      >
        <LogoWrapper>
          <Logo src={img} alt="service logo" />
        </LogoWrapper>
        <TextContainer>
          <Typography className="textSmallBold" color="text.primary">
            {title}
          </Typography>
          <Typography
            className="textSmallRegular"
            color="text.primary"
          >{`кешбэк ${cashback}%`}</Typography>
        </TextContainer>
      </Card>
    </Link>
  );
};
export default RecommendedShield;
