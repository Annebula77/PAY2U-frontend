import { type FC, type PropsWithChildren } from 'react';
import styled from 'styled-components';
import { ContainedButton } from '../buttons/containedButton/ContainedButton';
import { OutlinedButton } from '../buttons/outlinedButton/OutlinedButton';
import { Link } from 'react-router-dom';
import { resetBox } from '../../styles/mixIns';

interface Props extends PropsWithChildren {
  toNext: string;
  out: string;
}

const StyledSection = styled.section`
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 72px 16px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 48px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const ContentContainer = styled.article`
  width: 100%;
  ${resetBox()};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;


const OnboardingBody: FC<Props> = ({ toNext, out, children }) => {

  return (
    <StyledSection>
      <ContentContainer>{children}</ContentContainer>
      <ButtonContainer>
        <Link to={toNext} style={{ textDecoration: 'none', width: '100%' }}>
          <ContainedButton
            variant='contained'>Далее</ContainedButton>
        </Link>
        <Link to={out} style={{ textDecoration: 'none', width: '100%' }}>
          <OutlinedButton variant='outlined'>Пропустить</OutlinedButton>
        </Link>
      </ButtonContainer>
    </StyledSection>
  )

}

export default OnboardingBody;