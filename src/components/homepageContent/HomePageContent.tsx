import { Typography } from "@mui/material";
import { StyledSection } from "../../styles/pageAndOnboardingStyles";
import Header from "../header/Header";
import Main from "../main/Main";
import MainPageTabs from "../mainPageTabs/MainPageTabs";
import styled from "styled-components";

const TabsWrapper = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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