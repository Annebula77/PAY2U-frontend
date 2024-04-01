import { Typography } from '@mui/material';
import { StyledSection } from 'src/styles/pageAndOnboardingStyles';
import Header from '../Header/Header';
import Main from '../Main/Main';
import MainPageTabs from '../MainPageTabs/MainPageTabs';
import styled from 'styled-components';
import { resetBox } from 'src/styles/mixIns';

const TabsWrapper = styled.div`
  ${resetBox()};
`;

const HomePageContent = () => {
  return (
    <StyledSection>
      <Header />
      <Main>
        <Typography
          variant="h2"
          align="left"
          sx={{ margin: '20px 0px 20px 8px' }}
        >
          Все подписки
        </Typography>
        <TabsWrapper>
          <MainPageTabs />
        </TabsWrapper>
      </Main>
    </StyledSection>
  );
};
export default HomePageContent;
