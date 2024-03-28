import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import HomePageContent from "../components/homepageContent/HomePageContent";
import { useLocation } from 'react-router-dom';
import CookiesModal from '../cookiesModal/CookiesModal';
import { StyledSection } from "../styles/pageAndOnboardingStyles";
import { setCookieConsent } from '../store/slices/cookiesSlice';



const HomePage = () => {
  const dispatch = useAppDispatch();
  const consentGiven = useAppSelector((state) => state.cookies.consentGiven);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/main' && !consentGiven) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, consentGiven]);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent') === 'true';
    dispatch(setCookieConsent(consent));
  }, [dispatch]);

  const handleAccept = () => {
    const consentInfo = {
      consentGiven: true,
      date: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consentInfo));
    dispatch(setCookieConsent(true));
    setShowModal(false);
  };

  return (
    <StyledSection>
      <HomePageContent />
      {showModal && <CookiesModal onClick={handleAccept} />}
    </StyledSection>
  );

}

export default HomePage;