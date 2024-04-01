import { type FC } from 'react';
import { createPortal } from 'react-dom';
import { ContainedButton } from '../buttons/ContainedButton/ContainedButton';
import { Card, CardContent, Typography } from '@mui/material';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface CookiesProp {
  onClick: () => void;
}

const CookiesContainer = styled.section`
  position: sticky;
  left: 0;
  right: 0;
  bottom: 199px;
  width: 375px;
  display: flex;
  flex-direction: column;
  z-index: 10;
`;

const CookiesModal: FC<CookiesProp> = ({ onClick }) => {
  return createPortal(
    <CookiesContainer>
      <Card
        sx={{
          background: 'rgba(242, 247, 255, 1)',
        }}
      >
        <CardContent sx={{}}>
          <Typography
            className="textCard"
            color="primary.main"
            align="left"
            sx={{
              margin: '4px 0 20px',
            }}
          >
            Мы используем <Link to="/cookies">файлы cookie</Link>, чтобы
            улучшить работу сервиса. Оставаясь с нами, вы соглашаетесь на их
            применение
          </Typography>
          <ContainedButton
            type="button"
            variant="contained"
            onClick={evt => {
              evt.stopPropagation();
              onClick();
            }}
          >
            {' '}
            Хорошо
          </ContainedButton>
        </CardContent>
      </Card>
    </CookiesContainer>,
    document.body
  );
};

export default CookiesModal;
