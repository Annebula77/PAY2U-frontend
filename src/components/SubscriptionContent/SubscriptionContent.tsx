import { type FC, useEffect, useState } from 'react';
import { type SingleSubScriptionModel } from 'src/models/singleSubscriptionSchema';
import { useAppDispatch } from 'src/store/hooks';
import { Typography } from '@mui/material';
import Benefit from '../Benefits/Benefits';
import ExpandableTextCard from 'src/components/ExpandableTextCard/ExpandableTextCard';
import SubscriptionAccordion from '../SubscriptionAccordion/SubscriptionAccordion';
import HeartButton from '../icons/HeartIcon';
import CustomTooltip from '../CustomTooltip/CustomTooltip';
import { addFavorite, removeFavorite } from 'src/store/slices/toggleLikesSlice';
import {
  BenefitContainer,
  Icon,
  ImageContainer,
  LogoContainer,
  MainImage,
  StyledHeartButton,
  SubcategoryContainer,
  TariffContainer,
} from './subscriptionContentStyles';

export interface SubscriptionContentProps {
  subscription: SingleSubScriptionModel;
}

const RENDER_URL = import.meta.env.VITE_RENDER_URL;

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
