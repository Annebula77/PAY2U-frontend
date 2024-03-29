import styled from "styled-components";
import { Typography } from "@mui/material";
import InfoIcon from "../icons/InfoIcon";


const StyledSection = styled.section`
  width: 375px;
  box-sizing: border-box;
  margin: 0;
  padding: 16px;
`;

const TextContainer = styled.article`
  width: 100%; 
  margin: 0;
  padding: 6px 0 0px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;  
`;

const IconContainer = styled.div`
  margin: 0;
  padding: 24px 0 12px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 12px;
`;

const HowItWorksContent = () => (
  <StyledSection>
    <Typography
      variant="h1"
      align="left"
      sx={{
        marginTop: '8px',
        marginBottom: '22px',
      }}
    >
      Как работает?
    </Typography>
    <TextContainer>
      <Typography
        variant="h3"
        align="left"
        color="primary.main"
        sx={{
          marginBottom: '16px',
        }}
      >
        Как подключить подписку
      </Typography>
      <Typography
        className="textRegular"
        color="text.primary"
        align="left"
      >
        Выберете нужный период подписки. Укажите телефон,
        к которому будет привязана подписка.
        Оплатите, выбрав счет списания
      </Typography>
      <Typography
        variant="h3"
        align="left"
        color="primary.main"
        sx={{
          marginTop: '24px',
          marginBottom: '12px',
        }}
      >
        Где я буду видеть оформленные подписки
      </Typography>
      <Typography
        className="textRegular"
        color="text.primary"
        align="left"
      >
        Оформленная подписка появится в разделе «Мои подписки»
      </Typography>
      <Typography
        variant="h3"
        align="left"
        color="primary.main"
        sx={{
          marginTop: '24px',
          marginBottom: '12px',
        }}
      >
        Если у меня уже есть подписка
      </Typography>
      <Typography
        className="textRegular"
        color="text.primary"
        align="left"
      >
        Посмотрите правила синхронизации в карточке подписки
      </Typography>
      <Typography
        variant="h3"
        align="left"
        color="primary.main"
        sx={{
          marginTop: '24px',
          marginBottom: '12px',
        }}
      >
        Как отключить подписку
      </Typography>
      <Typography
        className="textRegular"
        color="text.primary"
        align="left"
      >
        Подписку и списания по ней можно отключить в разделе «Мои подписки»
      </Typography>
      <IconContainer>
        <InfoIcon />
        <Typography
          variant="h3"
          align="left"
          color="primary.main"
        >
          Защита данных
        </Typography>
      </IconContainer>
      <Typography
        className="textRegular"
        color="text.primary"
        align="left"
      >
        Платежные данные вашей карты остаются в банке и не передаются в сторонние сервисы
      </Typography>

    </TextContainer>
  </StyledSection>

);
export default HowItWorksContent;