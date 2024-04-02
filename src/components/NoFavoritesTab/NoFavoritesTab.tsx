import styled from 'styled-components';
import Favorites from 'src/assets/favorites.png';
import { Typography } from '@mui/material';

const StyledTabSection = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 0 0 235px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const ImageContainer = styled.div`
  box-sizing: border-box;
  width: 77px;
  height: 78px;
  margin: 0;
  padding: 0;
`;

const NoFavoritesTab = () => {
  return (
    <StyledTabSection>
      <ImageContainer>
        <img src={Favorites} alt="нет лайков" />
      </ImageContainer>
      <Typography
        className="textSmallBold"
        color="text.primary"
        align="center"
        sx={{
          width: '60%',
        }}
      >
        Здесь будут подписки, которые вы добавите в Избранное
      </Typography>
    </StyledTabSection>
  );
};

export default NoFavoritesTab;
