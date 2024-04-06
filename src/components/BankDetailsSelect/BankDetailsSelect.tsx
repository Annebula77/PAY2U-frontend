import { type FC } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SvgIconProps,
  type SelectChangeEvent,
} from '@mui/material';
import { type AccountModel } from '../../models/clientByIdSchema';
import BankDetails from '../BankDetails/BankDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface BankDetailsSelectProps {
  bankDetails: AccountModel[];
  value: string;
  onChange?: (event: SelectChangeEvent) => void;
}

const BankDetailsSelect: FC<BankDetailsSelectProps> = ({
  bankDetails,
  value,
  onChange,
}) => {
  const BlueExpandMoreIcon = (props: SvgIconProps) => (
    <ExpandMoreIcon {...props} style={{ color: 'rgba(66, 119, 202, 1)' }} />
  );
  return (
    <FormControl variant="filled" fullWidth required>
      <InputLabel
        id="account-label"
        shrink={true}
        sx={{
          marginLeft: '-10px',
        }}
      >
        Счет списания
      </InputLabel>
      <Select
        labelId="account-label"
        id="bank-account"
        value={value}
        onChange={onChange}
        IconComponent={BlueExpandMoreIcon}
        displayEmpty
        required
        sx={{
          '& .MuiSelect-select': {
            backgroundColor: 'rgba(255, 255, 255, 1)',
            '&:focus': {
              backgroundColor: 'rgba(242, 247, 255, 1)',
            },
          },
          '& .MuiMenuItem-root:hover': {
            backgroundColor: 'rgba(242, 247, 255, 1)',
          },
        }}
      >
        <MenuItem disabled value="">
          Выберите счет
        </MenuItem>
        {bankDetails.map((acc, index: number) => (
          <MenuItem
            key={index}
            value={acc.number}
            sx={{
              width: '100%',
              margin: 0,
              padding: 0,
            }}
          >
            <BankDetails
              name={acc.name}
              account={acc.number}
              balance={acc.balance}
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default BankDetailsSelect;
