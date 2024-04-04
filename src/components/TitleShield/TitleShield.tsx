import { Card, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { useNavigate } from 'react-router-dom';
import Cake from 'src/assets/cake.png';
import ArrowRight from '../icons/ArrowRight';
import { fetchToken } from 'src/store/slices/tokenSlice';
import { type SyntheticEvent } from 'react';
import {
  BackgroundImage,
  StyledCardContent,
  StyledDiv,
  StyledLinkDiv,
  StyledParagraph,
  InvisibleButton,
} from './titleShieldStyles';
import { fetchClientById } from 'src/store/slices/clientByIdSlice';
import { getClientIdFromToken } from 'src/utils/getClientIdFromToken';


const TitleShield = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: client } = useAppSelector(state => state.client);

  const handleLinkClick = async (evt: SyntheticEvent) => {
    evt.preventDefault();
    const id = 1;
    try {
      await dispatch(fetchToken(id)).unwrap();
      const clientId = getClientIdFromToken();
      if (!clientId) {
        return;
      }
      await dispatch(fetchClientById(clientId))
      if (!client) {
        return;
      }
      if (client.month_cashback === null) {
        navigate('/onboarding1');
        return;
      } else { navigate('/main'); }

    } catch (error) {
      console.error('Ошибка при получении токена', error);
    }
  };




  return (
    <Card sx={{ width: '343px', height: '132px' }}>
      <StyledCardContent>
        <StyledDiv>
          <Typography className="textCardH1">Мои подписки</Typography>
          <Typography className="textSmallRegular" color="text.secondary">
            Управление подписками, контроль списаний, кешбэк с автоплатежей
          </Typography>
          <InvisibleButton onClick={handleLinkClick}>
            <StyledLinkDiv>
              <ArrowRight />
              <StyledParagraph>Подробнее</StyledParagraph>
            </StyledLinkDiv>
          </InvisibleButton>
        </StyledDiv>
        <BackgroundImage src={Cake} alt="Фон" />
      </StyledCardContent>
    </Card>
  );
};

export default TitleShield;
