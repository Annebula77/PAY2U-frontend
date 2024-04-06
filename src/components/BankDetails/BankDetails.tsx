import { type FC } from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import { maskString } from '../../utils/maskString';

export interface BankDetailsProps {
  name: string;
  account: string;
  balance: number;
}

const BankDetailsWrapping = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin: 0 0 -7px;
  padding: 12px 0 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.palette.secondary.main};
`;

const InsideWrapping = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

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
