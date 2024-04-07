import { type FC, useEffect, useState } from 'react';
import { type SingleSubScriptionModel } from 'src/models/singleSubscriptionSchema';
import { useAppDispatch } from 'src/store/hooks';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Benefit from '../Benefits/Benefits';
import ExpandableTextCard from 'src/components/ExpandableTextCard/ExpandableTextCard';
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
import SubscriptionTariffs from '../SubscriptionTariffs/SubscriptionTariffs';

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
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h3" color="textPrimary" align="left">
              Условия
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ gap: '12px' }}>
            <Typography
              className="textRegular"
              color="textPrimary"
              align="left"
              sx={{ marginBottom: '16px' }}
            >
              {subscription.conditions}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <SubscriptionTariffs subscription={subscription} />
      </TariffContainer>
    </SubcategoryContainer>
  );
};

export default SubscriptionContent;
