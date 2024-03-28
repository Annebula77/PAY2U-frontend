import { type FC } from "react";
import { Card, CardContent, Typography } from "@mui/material";


interface NoSubsShieldProps {
  title: string;
  text: string;
}


const NoSubsShield: FC<NoSubsShieldProps> = ({ title, text }) => {
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
          alignItems: 'center',
          gap: '4px',
        }}
      >
        <Typography
          className="textRegular"
          color="text.primary"
          align="center">
          {title}
        </Typography>
        <Typography
          className="textSmallRegular"
          color="text.secondary"
          align="center">
          {text}
        </Typography>
      </CardContent>
    </Card >
  );
}
export default NoSubsShield;