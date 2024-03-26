import OnboardingBody from "../onboardingBody/OnboardingBody";
import onboarding1 from '../../assets/onboarding1.png';
import { Typography } from "@mui/material";
import { ScreenShot, TextDiv } from "../../styles/pageAndOnboardingStyles";



const OnboardingOneContent = () => (
  <>
    <OnboardingBody toNext="/onboarding2" out="/">
      <ScreenShot src={onboarding1} alt="управление подписками" />
      <TextDiv>
        <Typography variant="h1" align="center">Управляйте своими
          подписками легко</Typography>
        <Typography className="textRegular" align="center">Добавляйте и
          отслеживайте сервисы в одном месте</Typography>
      </TextDiv>
    </OnboardingBody>
  </>
);
export default OnboardingOneContent;

