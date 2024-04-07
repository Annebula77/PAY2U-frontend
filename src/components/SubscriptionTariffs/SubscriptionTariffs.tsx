import { useState, type FC } from 'react';
import { Typography } from '@mui/material';
import { type SubscriptionContentProps } from '../SubscriptionContent/SubscriptionContent';
import TariffShield from '../TariffShield/TariffShield';
import styled from 'styled-components';
import { resetBox } from 'src/styles/mixIns';
import { GeneralModal } from '../GeneralModal/GeneralModal';
import TariffAdditionModal from '../TariffAdditionModal/TariffAdditionModal';
import { InvisibleButton } from 'src/styles/reusableStyles';
import { type TariffModel } from 'src/models/singleSubscriptionSchema';
import { StyledSection } from '../NoCashbackContent/noCashbackContentStyles';

const TariffContainer = styled.div`
  ${resetBox()}
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SubscriptionTariffs: FC<SubscriptionContentProps> = ({
  subscription,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTariff, setSelectedTariff] = useState<TariffModel | null>(
    null
  );

  const handleTariffClick = (tariff: TariffModel) => {
    setSelectedTariff(tariff);
    setShowModal(true);
  };

  const onClose = () => {
    setShowModal(false);
  };

  return (
    <StyledSection>
      <Typography
        variant="h2"
        color="textPrimary"
        align="left"
        sx={{ marginBottom: '16px' }}
      >
        Выберите тариф
      </Typography>
      <TariffContainer>
        {subscription.tariffs.map(tariff => (
          <InvisibleButton
            key={tariff.id}
            type="button"
            onClick={() => handleTariffClick(tariff)}
          >
            <TariffShield
              name={tariff.name}
              amount={tariff.amount}
              cashback={subscription.cashback.amount.toString()}
              period={tariff.days_amount}
            />
          </InvisibleButton>
        ))}
        {showModal && (
          <GeneralModal
            onClose={() => {
              setShowModal(false);
            }}
            showCloseButton
          >
            <TariffAdditionModal
              subscription={subscription}
              tariff={selectedTariff}
              onClose={onClose}
            />
          </GeneralModal>
        )}
      </TariffContainer>
    </StyledSection>
  );
};

export default SubscriptionTariffs;
