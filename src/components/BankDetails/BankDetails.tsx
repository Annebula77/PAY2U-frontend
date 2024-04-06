import { type FC } from 'react';
import { Typography } from '@mui/material';
import { maskString } from 'src/utils/maskString';
import { BankDetailsWrapping, InsideWrapping } from './bankDetailsStyles';

export interface BankDetailsProps {
  name: string;
  account: string;
  balance: number;
}

const BankDetails: FC<BankDetailsProps> = ({ name, account, balance }) => (
  <BankDetailsWrapping>
    <InsideWrapping>
      <Typography className="textRegular" color="text.primary" align="left">
        {name}
      </Typography>
      <Typography
        className="textSmallRegular"
        color="text.secondary"
        align="left"
      >
        {`${balance} ₽`}
      </Typography>
    </InsideWrapping>
    <Typography
      className="textRegular"
      color="text.primary"
      align="left"
      sx={{ paddingRight: '8px' }}
    >
      {maskString(account)}
    </Typography>
  </BankDetailsWrapping>
);

export default BankDetails;
