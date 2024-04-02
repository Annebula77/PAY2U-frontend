import { type FC, useEffect, useState } from 'react';
import { type SingleSubScriptionModel } from 'src/models/singleSubscriptionSchema';
import { useAppDispatch } from 'src/store/hooks';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import Benefit from '../Benefits/Benefits';
import { resetBox } from 'src/styles/mixIns';
import ExpandableTextCard from 'src/components/ExpandableTextCard/ExpandableTextCard';
import SubscriptionAccordion from '../SubscriptionAccordion/SubscriptionAccordion';
import HeartButton from '../icons/HeartIcon';
import CustomTooltip from '../CustomTooltip/CustomTooltip';
import { RENDER_URL } from '../../utils/variables';
import {
  addFavorite,
  removeFavorite,
} from '../../store/slices/toggleLikesSlice';

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

const ImageContainer = styled.div`
  position: relative;
  width: 375px;
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
  border-radius: 12px;
  width: 40px;
  height: 40px;
`;

const MainImage = styled.img`
  width: 375px;
  z-index: 1;
`;

const StyledHeartButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  outline: none;
  border: none;
  background-color: transparent;
  z-index: 10;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const SubscriptionContent: FC<SubscriptionContentProps> = ({
  subscription,
}) => {
  const dispatch = useAppDispatch();

  const benefitsWithFullIconUrl = subscription.subscription_benefits.map(
    benefit => {
      const fullIconUrl = `${RENDER_URL}${decodeURIComponent(benefit.icon)}`;
      return { ...benefit, icon: fullIconUrl };
    }
  );
  const [isLiked, setIsLiked] = useState(subscription.is_liked);

  useEffect(() => {
    setIsLiked(subscription.is_liked);
  }, [subscription.is_liked]);

  const handleFavoriteClick = async () => {
    if (isLiked) {
      await dispatch(removeFavorite({ subscription: subscription.id }));
    } else {
      await dispatch(addFavorite({ subscription: subscription.id }));
    }
    setIsLiked(!isLiked);
  };

  return (
    <SubcategoryContainer>
      <ImageContainer>
        <StyledHeartButton onClick={handleFavoriteClick}>
          <CustomTooltip isLiked={isLiked}>
            <HeartButton isLiked={isLiked} />
          </CustomTooltip>
        </StyledHeartButton>
        <MainImage
          src={subscription.image_detail}
          alt={`Подписка ${subscription.name}`}
        />
      </ImageContainer>
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
