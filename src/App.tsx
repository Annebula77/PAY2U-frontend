import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import ShieldInApp from './pages/ShieldInApp';
import OnboardingOne from './pages/OnboardingOne';
import OnboardingTwo from './pages/OnboardingTwo';
import OnboardingThree from './pages/OnboardingThree';




const StyledSection = styled.section`
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0;  
`;

const App = () => (
  <StyledSection>
    <Routes>
      <Route path="/" element={<ShieldInApp />} />
      <Route path="/onboarding1" element={<OnboardingOne />} />
      <Route path="/onboarding2" element={<OnboardingTwo />} />
      <Route path="/onboarding3" element={<OnboardingThree />} />
      {/* <Route path="/main" element={<HomePage />} /> */}

    </Routes>
  </StyledSection>
);

export default App;