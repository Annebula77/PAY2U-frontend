import { type FC } from "react";
import { Card, Typography } from "@mui/material";
import styled from "styled-components";
import MockLogo from "../../assets/mockIcon.png";
import { Link } from "react-router-dom";
import { resetBox } from "../../styles/mixIns";


interface ShieldProps {
  img: string;
  title: string;
  cashback: string;
  route: string;
}


const TextContainer = styled.span`
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0 0 0 4px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  `;

const LogoWrapper = styled.div`
  width: 100%; 
  box-sizing: border-box;  
  border-radius: 12px;  
  margin: 0;
  padding: 0;
`;
const Logo = styled.img` 
  width: 88px;
  height: 88px;
  display: block;
  ${resetBox()};
  border-radius: 12px;
`;

const RecommendedShield: FC<ShieldProps> = ({ img, title, cashback, route }) => {
  return (
    <Link to={route} style={{ textDecoration: 'none', width: '100%' }}>
      <Card sx={{
        width: '88px',
        height: '126px',
        margin: '10px 0 0',
        backgroundColor: "transparent",
        outline: 'none',
        boxShadow: 'none',
      }} >
        <LogoWrapper>
          <Logo src={img ? img : MockLogo} alt="service logo" />
        </LogoWrapper>
        <TextContainer>
          <Typography className="textSmallBold" color="text.primary">{title ? title : 'КРУТО-ТВ'}</Typography>
          <Typography className="textSmallRegular" color="text.primary">{`кешбэк ${cashback ? cashback : '99'}%`}</Typography>
        </TextContainer>
      </Card>
    </Link>
  );
}
export default RecommendedShield;