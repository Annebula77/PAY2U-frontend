import { type FC } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { type DetailedSubsShieldProps } from '../DetailedSubsShield/DetailedSubsShield';
import SuccessIcon from '../icons/SuccessIcon';
import { OutlinedButton } from '../buttons/OutlinedButton/OutlinedButton';
import IOSSwitch from '../IOSSwitch/IOSSwitch';
import {
  ButtonContainer,
  DetailsContainer,
  HeadContainer,
  SlotContainer,
} from './detailedSubsShieldAccordionStyles';

type PartialSubsShieldProps = Pick<
  DetailedSubsShieldProps,
  | 'price'
  | 'accountNumber'
  | 'tel'
  | 'link'
  | 'prolongation'
  | 'paymentDate'
  | 'onChange'
  | 'cashbackAmount'
  | 'onClick'
  | 'isDisabled'
>;

const DetailedSubsShieldAccordion: FC<PartialSubsShieldProps> = ({
  price,
  accountNumber,
  tel,
  link,
  prolongation,
  onChange,
  paymentDate,
  cashbackAmount,
  onClick,
  isDisabled,
}) => {
  return (
    <Accordion
      sx={{
        margin: '0 0 -10px',
        padding: 0,
        width: '100%',
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: 'text.primary' }} />}
        aria-controls="card-content"
        id="card-details"
        sx={{
          margin: '0 0 -10px',
          padding: 0,
        }}
      >
        <HeadContainer>
          <SuccessIcon width={20} height={20} />
          <Typography
            className="textSmallMedium"
            color="text.secondary"
            align="left"
          >
            {`Списание ${paymentDate}`}
          </Typography>
        </HeadContainer>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          gap: '12px',
          margin: 0,
          padding: 0,
          width: '100%',
        }}
      >
        <Divider
          aria-hidden="true"
          sx={{
            marginBottom: '12px',
          }}
        />
        <DetailsContainer>
          <SlotContainer>
            <Typography
              className="textRegular"
              color="text.secondary"
              align="left"
              sx={{
                marginBottom: '12px',
              }}
            >
              Стоимость подписки
            </Typography>
            <Typography
              variant="h4"
              color="text.primary"
              align="right"
            >{`${price} ₽`}</Typography>
          </SlotContainer>
          <SlotContainer>
            <Typography
              className="textRegular"
              color="text.secondary"
              align="left"
              sx={{
                marginBottom: '12px',
              }}
            >
              Кешбек по тарифу
            </Typography>
            <Typography
              variant="h4"
              color="text.primary"
              align="right"
            >{`${cashbackAmount} ₽`}</Typography>
          </SlotContainer>
          <SlotContainer>
            <Typography
              className="textRegular"
              color="text.secondary"
              align="left"
              sx={{
                marginBottom: '12px',
              }}
            >
              Зарплатный счёт
            </Typography>
            <Typography variant="h4" color="text.primary" align="right">
              {accountNumber}
            </Typography>
          </SlotContainer>
          <SlotContainer>
            <Typography
              className="textRegular"
              color="text.secondary"
              align="left"
              sx={{
                marginBottom: '12px',
              }}
            >
              Номер телефона
            </Typography>
            <Typography variant="h4" color="text.primary" align="right">
              {tel}
            </Typography>
          </SlotContainer>
          <SlotContainer>
            <Typography
              className="textRegular"
              color="text.secondary"
              align="left"
              sx={{
                marginBottom: '12px',
              }}
            >
              Автопродление
            </Typography>
            <IOSSwitch checked={prolongation} onChange={onChange} />
          </SlotContainer>
          <SlotContainer>
            <Typography
              component="a"
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="textRegular"
              color="primary"
              sx={{
                textDecoration: 'none',
                ':hover': {
                  textDecoration: 'underline',
                },
                marginBottom: '12px',
                padding: 0,
              }}
            >
              Ссылка на сервис
            </Typography>
          </SlotContainer>
        </DetailsContainer>
        <ButtonContainer>
          <OutlinedButton
            variant="outlined"
            disabled={isDisabled}
            onClick={onClick}
            sx={{ textTransform: 'none' }}
          >
            Отключить подписку
          </OutlinedButton>
        </ButtonContainer>
      </AccordionDetails>
    </Accordion>
  );
};

export default DetailedSubsShieldAccordion;
