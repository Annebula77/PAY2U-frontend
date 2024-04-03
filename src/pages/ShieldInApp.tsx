import DetailedSubsShield from '../components/DetailedSubsShield/DetailedSubsShield';
import TitleShield from '../components/TitleShield/TitleShield';
import { StyledSection } from '../styles/reusableStyles';
import Cake from '../assets/cake.png';

const ShieldInApp = () => (
  <>
    <StyledSection>
      <TitleShield />
      <DetailedSubsShield
        img={Cake}
        name="ОККО"
        price={450}
        cashbackAmount={200}
        cashback={10}
        accountNumber="*** 3456"
        tel="+79160000000"
        link="https://pay2u.eremezov.com/admin/subscriptions/subscription/"
        prolongation={true}
        route="/main"
        paymentDate="1 мая"
      />
    </StyledSection>
  </>
);

export default ShieldInApp;
