import { type FC } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';


interface HasSubsShieldProps {
  stats: number | 0;
  name: string;
  date?: Date | null;
  showCurrencySymbol?: boolean;
}



const HasSubsShield: FC<HasSubsShieldProps> = ({ stats, name, date, showCurrencySymbol }) => {
  const formattedDate = date ? format(date, 'd MMMM', { locale: ru }) : '';
  return (
    <Card sx={{
      margin: 0,
      flexGrow: '1',
      flexBasis: 'calc(50% - 8px)',
      maxWidth: '100%'
    }} >
      <CardContent
        sx={{
          width: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        <Typography
          variant="h4"
          color="primary.main"
          align="center"
        >
          {`${stats}${showCurrencySymbol ? '₽' : ''}`}
        </Typography>
        <Typography
          className="textRegular"
          color="text.primary"
          align="center"
        >
          {name}
        </Typography>
        <Typography
          className="textSmallRegular"
          color="text.secondary"
          align="center">
          {formattedDate}
        </Typography>
      </CardContent>
    </Card >
  );
}
export default HasSubsShield;