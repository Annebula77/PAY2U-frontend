import { type FC } from 'react';
import { type SingleSubScriptionModel } from 'src/models/singleSubscriptionSchema';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import Benefit from '../Benefits/Benefits';
import { resetBox } from 'src/styles/mixIns';
import ExpandableTextCard from 'src/ExpandableTextCard/ExpandableTextCard';
import SubscriptionAccordion from '../SubscriptionAccordion/SubscriptionAccordion';

export interface SubscriptionContentProps {
  subscription: SingleSubScriptionModel;
}

const SubcategoryContainer = styled.section`
  width: 100%;
  box-sizing: border-box;
  margin: 12px 0 12px;
  padding: 0;
  display: flex;
  flex-direction: column;
`;
const LogoContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 32px 16px 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const BenefitContainer = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0 16px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TariffContainer = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 32px 0 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Icon = styled.img`
  ${resetBox()};
  display: inline-block;
  width: 40px;
  height: 40px;
`;

// NOTE: изменить место или удалить
const NewURL = 'https://pay2u.eremezov.com/';
const SubscriptionContent: FC<SubscriptionContentProps> = ({
  subscription,
}) => {
  const benefitsWithFullIconUrl = subscription.subscription_benefits.map(
    benefit => {
      const fullIconUrl = `${NewURL}${decodeURIComponent(benefit.icon)}`;
      return { ...benefit, icon: fullIconUrl };
    }
  );

  return (
    <SubcategoryContainer>
      <img
        src={subscription.image_detail}
        alt={`Подписка ${subscription.name}`}
      />
      <LogoContainer>
        <Icon
          src={subscription.image_preview}
          alt={`Подписка ${subscription.name}`}
        />
        <Typography variant="h1" align="left">
          {subscription.name}
        </Typography>
      </LogoContainer>
      <BenefitContainer>
        {benefitsWithFullIconUrl.map(benefitData => (
          <Benefit
            key={benefitData.id}
            icon={benefitData.icon}
            benefit={benefitData.benefit}
          />
        ))}
      </BenefitContainer>

      <ExpandableTextCard text={subscription.description} />

      <TariffContainer>
        <SubscriptionAccordion subscription={subscription} />
      </TariffContainer>
    </SubcategoryContainer>
  );
};

export default SubscriptionContent;
