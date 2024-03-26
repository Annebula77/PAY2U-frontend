import OnboardingBody from "../onboardingBody/OnboardingBody";
import onboarding3 from '../../assets/onboarding3.png';
import { Typography } from "@mui/material";
import { ScreenShot, TextDivLong } from "../../styles/pageAndOnboardingStyles";

const OnboardingThreeContent = () => (
  <>
    <OnboardingBody toNext="/main" out="/">
      <ScreenShot src={onboarding3} alt="безопасность" />
      <TextDivLong>
        <Typography variant="h1" align="center">Данные под защитой</Typography>
        <Typography className="textRegular" align="center">Все данные остаются в банке</Typography>
      </TextDivLong>
    </OnboardingBody>
  </>
);
export default OnboardingThreeContent;

