import { Card, CardContent, Typography } from "@mui/material";
import { useAppDispatch } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import cake from '../../assets/cake.png';
import ArrowRight from "../icons/ArrowRight";
import { resetBox } from "../../styles/mixIns";
import { fetchToken } from "../../store/slices/tokenSlice";
import { type SyntheticEvent } from "react";

const StyledDiv = styled.div`
  ${resetBox()};
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 60%;  
  gap: 4px;
`;

const StyledLinkDiv = styled.div`
  margin: 14px 0 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const StyledCardContent = styled(CardContent)`
  position: relative;
  ${resetBox()};
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: row; 
  justify-content: space-between;
`;

const BackgroundImage = styled.img` 
  position: absolute;
  bottom: 0;
  right: 16px;
  width: 100px;
  height: 100px;  
  margin: 0;
  padding: 0;
`;

const StyledParagraph = styled.p`
 ${resetBox()};
  width: 50%;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.2; 
  letter-spacing: -0.078px;
  color: rgba(234, 65, 127, 1);
`;

const NextButton = styled.button`
 ${resetBox()};
 display: flex;
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const TitleShield = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLinkClick = async (evt: SyntheticEvent) => {
    evt.preventDefault();
    const id = 1;
    try {
      await dispatch(fetchToken(id)).unwrap();
      console.log(fetchToken.fulfilled);
      navigate("/onboarding1");
    } catch (error) {
      console.error("Ошибка при получении токена", error);
    }
  };


  return (
    <Card sx={{ width: '343px', height: '132px' }}>
      <StyledCardContent>
        <StyledDiv>
          <Typography className="textCardH1">Мои подписки</Typography>
          <Typography className="textSmallRegular" color="text.secondary">Управление подписками, контроль списаний, кешбэк
            с автоплатежей</Typography>
          <NextButton onClick={handleLinkClick}>
            <StyledLinkDiv>
              <ArrowRight />
              <StyledParagraph>Подробнее</StyledParagraph>
            </StyledLinkDiv>
          </NextButton>
        </StyledDiv>
        <BackgroundImage src={cake} alt="Фон" />
      </StyledCardContent>
    </Card>
  );
}

export default TitleShield;