import { type FC } from 'react';
import { Typography, useTheme } from '@mui/material';
import {
  Logo,
  LogoContainer,
  StyledDiv,
  UpperTextBox,
} from './cashbackShieldStyles';
import { CashbackStatus } from 'src/types/CashbackStatusEnum';

const RENDER_URL = import.meta.env.VITE_RENDER_URL;

interface CashbackShieldProps {
  img: string;
  name: string;
  invoice: number;
  amount: number;
  status: CashbackStatus;
}

const CashbackShield: FC<CashbackShieldProps> = ({
  img,
  name,
  invoice,
  amount,
  status,
}) => {
  const theme = useTheme();

  const statusStyles = {
    [CashbackStatus.Pending]: { color: theme.palette.text.secondary },
    [CashbackStatus.Credited]: { color: theme.palette.success.main },
  };

  const CashbackStatusLabels: Record<CashbackStatus, string> = {
    [CashbackStatus.Pending]: 'oжидается',
    [CashbackStatus.Credited]: 'зачислен',
  };

  const fullIconUrl = `${RENDER_URL}${decodeURIComponent(img)}`;

  return (
    <StyledDiv>
      <UpperTextBox>
        <LogoContainer>
          <Logo src={fullIconUrl} alt="service image" />
          <Typography variant="h3" color="text.primary" align="left">
            {name}
          </Typography>
        </LogoContainer>
        <Typography className="textRegular" color="text.secondary" align="left">
          {`чек №${invoice}`}
        </Typography>
      </UpperTextBox>
      <UpperTextBox>
        <Typography
          variant="h2"
          color="text.primary"
          align="right"
        >{`+ ${amount} ₽`}</Typography>
        <Typography
          className="textCardH1"
          color="primary.main"
          style={statusStyles[status]}
          align="right"
        >
          {CashbackStatusLabels[status]}
        </Typography>
      </UpperTextBox>
    </StyledDiv>
  );
};
export default CashbackShield;
