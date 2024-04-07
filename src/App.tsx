import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch } from './store/hooks';
import styled from 'styled-components';
import ShieldInApp from './pages/ShieldInApp';
import OnboardingOne from './pages/OnboardingOne';
import OnboardingTwo from './pages/OnboardingTwo';
import OnboardingThree from './pages/OnboardingThree';
import HomePage from './pages/HomePage';
import CookiesPage from './pages/CookiesPage';
import { setTokens } from './store/slices/tokenSlice';
import SubscriptionPage from './pages/SubscriptionPage';
import CalendarPage from './pages/CalendarPage';
import NotFoundPage from './pages/NotFoundPage';
import CashbackPage from './pages/CashbackPage';

const StyledSection = styled.section`
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
`;

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');
    if (access_token && refresh_token) {
      dispatch(setTokens({ access_token, refresh_token }));
    }
  }, [dispatch]);

  return (
    <StyledSection>
      <Routes>
        <Route path="/" element={<ShieldInApp />} />
        <Route path="/onboarding1" element={<OnboardingOne />} />
        <Route path="/onboarding2" element={<OnboardingTwo />} />
        <Route path="/onboarding3" element={<OnboardingThree />} />
        <Route path="/me" element={<HomePage />} />
        <Route path="/cookies" element={<CookiesPage />} />
        <Route
          path="/me/subscriptions/:subscription_id"
          element={<SubscriptionPage />}
        />
        <Route path="/me/calendar" element={<CalendarPage />} />
        <Route path="/me/cashback" element={<CashbackPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </StyledSection>
  );
};

export default App;
