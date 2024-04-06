import { type FormEvent, useState, type FC } from 'react';
import { ModalStyledSection } from '../../styles/reusableStyles';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import BankDetailsSelect from '../BankDetailsSelect/BankDetailsSelect';
import {
  Chip,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import ErrorRoundIcon from '../icons/ErrorRoundIcon';
import IOSSwitch from '../IOSSwitch/IOSSwitch';
import { ContainedButton } from '../buttons/ContainedButton/ContainedButton';
import {
  type SingleSubScriptionModel,
  type TariffModel,
} from '../../models/singleSubscriptionSchema';
import { calculateSubscriptionCost } from '../../utils/calculateSubscriptionCost';
import styled from 'styled-components';
import { UpperTextBox } from '../TariffShield/tariffShieldStyles';
import { resetBox } from '../../styles/mixIns';
import { setAccount, setAutoPay } from '../../store/slices/formSlice';
import { addSubscription } from '../../store/slices/addSubscriptionSlice';

interface TariffProps {
  tariff: TariffModel | null;
  subscription: SingleSubScriptionModel;
  onClose: () => void;
}

export const NameContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 33px 0 26px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  && > :last-child {
    margin-top: -12px;
  }
`;

export const FormWrapping = styled.form`
  ${resetBox()};
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 100%;
  gap: 12px;
`;

export const SwitchWrapping = styled.div`
  ${resetBox()};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TariffAdditionModal: FC<TariffProps> = ({
  tariff,
  subscription,
  onClose,
}) => {
  const dispatch = useAppDispatch();

  const { data: clientById, loading: clientByIdLoading } = useAppSelector(
    state => state.client
  );
  const formState = useAppSelector(state => state.form);

  const [phone, setPhone] = useState(clientById?.phone);

  if (!clientById || clientByIdLoading) {
    return <div>Loading...</div>;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      addSubscription({
        subscription: subscription.id,
        charge_account: formState.charge_account,
        tariff: tariff?.id ?? 0,
        is_auto_pay: formState.is_auto_pay,
      })
    );
    onClose();
  };
  return (
    <ModalStyledSection>
      <Chip label={`кешбэк ${subscription.cashback.amount}%`} color="primary" />
      <NameContainer>
        <Typography
          variant="h2"
          color="text.primary"
          align="left"
        >{`Подписка на ${tariff?.name}`}</Typography>
        <UpperTextBox>
          <Typography
            variant="h3"
            color="text.primary"
            align="left"
          >{`${tariff?.amount} ₽`}</Typography>
          <Typography
            className="textRegular"
            color="text.secondary"
            align="left"
          >
            за месяц
          </Typography>
        </UpperTextBox>
        <Typography
          className="textRegular"
          color="text.secondary"
          align="left"
          sx={{
            margin: 0,
            padding: 0,
          }}
        >{`при разовой оплате ${calculateSubscriptionCost({
          amount: tariff?.amount ?? 0,
          days_amount: tariff?.days_amount ?? 0,
        })} ₽`}</Typography>
      </NameContainer>
      <FormWrapping onSubmit={handleSubmit}>
        <TextField
          label="Номер телефона"
          fullWidth
          variant="standard"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          InputProps={{
            sx: {
              padding: '10px',
            },
            endAdornment: (
              <InputAdornment position="end">
                {phone && (
                  <IconButton
                    aria-label="clear text"
                    onClick={() => setPhone('')}
                    edge="end"
                  >
                    <ErrorRoundIcon
                      width={22}
                      height={22}
                      fill={'rgba(66, 119, 202, 1)'}
                    />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
        <BankDetailsSelect
          bankDetails={clientById.bank_accounts}
          value={formState.charge_account}
          onChange={event => {
            dispatch(setAccount(event.target.value));
          }}
        />
        <Typography
          className="textSmallRegular"
          color="primary.main"
          align="left"
          sx={{
            marginTop: '-6px',
          }}
        >
          Этот счёт будет привязан при оплате подписки
        </Typography>
        <SwitchWrapping>
          <Typography
            className="textRegular"
            color="text.primary"
            align="left"
            sx={{
              marginBottom: '12px',
            }}
          >
            Автопродление
          </Typography>
          <IOSSwitch
            checked={formState.is_auto_pay}
            onChange={event => {
              dispatch(setAutoPay(event.target.checked));
            }}
          />
        </SwitchWrapping>
        <Typography
          className="textSmallRegular"
          color="primary.main"
          align="left"
        >
          Мы отправим вам уведомление о списании денежных средств за 2 дня
        </Typography>
        <ContainedButton
          type="submit"
          variant="contained"
          sx={{
            textTransform: 'none',
            padding: '8px 0 8px',
          }}
        >
          {`Подключить за ${calculateSubscriptionCost({
            amount: tariff?.amount ?? 0,
            days_amount: tariff?.days_amount ?? 0,
          })} ₽`}
        </ContainedButton>
        <Typography
          className="textSmallRegular"
          color="primary.main"
          align="center"
          sx={{
            marginBottom: '20px',
          }}
        >
          Оплачивая, вы соглашаетесь c
          <Typography
            className="textSmallRegular"
            color="primary.main"
            component="a"
            href="#"
          >
            {' '}
            правилами партнера{' '}
          </Typography>
          и даёте согласие на обработку персональных данных
        </Typography>
      </FormWrapping>
    </ModalStyledSection>
  );
};

export default TariffAdditionModal;
