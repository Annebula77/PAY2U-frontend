import { type FC } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface NoSubsShieldProps {
  title: string;
  text: string;
}

const NoSubsShield: FC<NoSubsShieldProps> = ({ title, text }) => {
  return (
    <Card
      sx={{
        flexGrow: '1',
        flexBasis: 'calc(50% - 8px)',
        maxWidth: '100%',
      }}
    >
      <CardContent
        sx={{
          margin: 0,
          padding: '16px 12px 16px',
          width: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        <Typography className="textRegular" color="text.primary" align="center">
          {title}
        </Typography>
        <Typography
          className="textSmallRegular"
          color="text.secondary"
          align="center"
          sx={{
            width: '100%',
          }}
        >
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default NoSubsShield;
