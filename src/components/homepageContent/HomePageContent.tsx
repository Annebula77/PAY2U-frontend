import { Typography } from "@mui/material";
import { StyledSection } from "../../styles/pageAndOnboardingStyles";
import Header from "../header/Header";
import Main from "../main/Main";
import MainPageTabs from "../mainPageTabs/MainPageTabs";
import styled from "styled-components";
import { resetBox } from "../../styles/mixIns";

const TabsWrapper = styled.div`
 ${resetBox()};
  `;

const HomePageContent = () => {
  return (
    <StyledSection>
      <Header />
      <Main>
        <Typography variant="h2" align="left" sx={{ margin: '20px 0px 20px 8px' }}>Все подписки</Typography>
        <TabsWrapper>
          <MainPageTabs />
        </TabsWrapper>
      </Main>
    </StyledSection>

  )
}
export default HomePageContent;