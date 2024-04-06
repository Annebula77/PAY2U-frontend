import { type FormEvent, useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalStyledSection } from 'src/styles/reusableStyles';
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
} from 'src/models/singleSubscriptionSchema';
import { calculateSubscriptionCost } from 'src/utils/costsCalculations/calculateSubscriptionCost';
import { UpperTextBox } from '../TariffShield/tariffShieldStyles';
import { setAccount, setAutoPay } from 'src/store/slices/formSlice';
import { addSubscription } from 'src/store/slices/addSubscriptionSlice';
import NotificationModal, {
  type NotificationModalProps,
} from '../NotificationModal/NotificationModal';
import { OutlinedButton } from '../buttons/OutlinedButton/OutlinedButton';
import {
  ButtonContainer,
  FormWrapping,
  NameContainer,
  SwitchWrapping,
} from './tariffAdditionModalStyles';

interface TariffProps {
  tariff: TariffModel | null;
  subscription: SingleSubScriptionModel;
  onClose: () => void;
}

const TariffAdditionModal: FC<TariffProps> = ({
  tariff,
  subscription,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: clientById, loading: clientByIdLoading } = useAppSelector(
    state => state.client
  );
  const formState = useAppSelector(state => state.form);

  const [phone, setPhone] = useState(clientById?.phone);

  const [notificationModalProps, setNotificationModalProps] =
    useState<NotificationModalProps | null>(null);

  if (!clientById || clientByIdLoading) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = `Подключить ${subscription.name} на ${tariff?.name} за ${calculateSubscriptionCost(
      {
        amount: tariff?.amount ?? 0,
        days_amount: tariff?.days_amount ?? 0,
      }
    )} ₽`;

    const link =
      subscription.subscription_benefits.find(benefit =>
        benefit.benefit.includes('https://')
      )?.benefit || 'значение по умолчанию';

    try {
      await dispatch(
        addSubscription({
          subscription: subscription.id,
          charge_account: formState.charge_account,
          tariff: tariff?.id ?? 0,
          is_auto_pay: formState.is_auto_pay,
        })
      ).unwrap();

      setNotificationModalProps({
        type: 'success',
        title: 'Оплачено',
        message: message,
        infoMessage: 'Мы выслали код активации на телефон',
        link: link,
        onClose: () => setNotificationModalProps(null),
        actions: (
          <ButtonContainer>
            <ContainedButton
              variant="contained"
              sx={{
                textTransform: 'none',
              }}
              onClick={() => {
                setNotificationModalProps(null);
                navigate('/me');
                onClose();
              }}
            >
              На главную
            </ContainedButton>
            <OutlinedButton
              variant="outlined"
              sx={{
                textTransform: 'none',
              }}
              onClick={() => {
                setNotificationModalProps(null);
                onClose();
              }}
            >
              Чек
            </OutlinedButton>
          </ButtonContainer>
        ),
      });
    } catch (error) {
      setNotificationModalProps({
        type: 'error',
        title: 'Оплата не прошла',
        message: message,
        infoMessage:
          'Банковская операция не обработана, пожалуйста, повторите попытку',
        onClose: () => setNotificationModalProps(null),
        actions: (
          <ButtonContainer>
            <ContainedButton
              variant="contained"
              sx={{
                textTransform: 'none',
              }}
              onClick={() => {
                setNotificationModalProps(null);
                onClose();
              }}
            >
              Повторить
            </ContainedButton>
            <OutlinedButton
              variant="outlined"
              sx={{
                textTransform: 'none',
              }}
              onClick={() => {
                setNotificationModalProps(null);
                navigate('/me');
                onClose();
              }}
            >
              На главную
            </OutlinedButton>
          </ButtonContainer>
        ),
      });
    }
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
          disabled={!formState.charge_account}
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
      {notificationModalProps && (
        <NotificationModal {...notificationModalProps} />
      )}
    </ModalStyledSection>
  );
};

export default TariffAdditionModal;
