import OnboardingBody from '../OnboardingBody/OnboardingBody';
import onboarding2 from 'src/assets/onboarding2.png';
import { Typography } from '@mui/material';
import { ScreenShot, TextDivLong } from 'src/styles/pageAndOnboardingStyles';

const OnboardingTwoContent = () => (
  <>
    <OnboardingBody toNext="/onboarding3" out="/">
      <ScreenShot src={onboarding2} alt="выгодно" />
      <TextDivLong>
        <Typography variant="h1" align="center">
          Подписывайтесь с выгодой
        </Typography>
        <Typography className="textRegular" align="center">
          Подключайте сервисы с кешбэком до 20%
        </Typography>
      </TextDivLong>
    </OnboardingBody>
  </>
);
export default OnboardingTwoContent;
