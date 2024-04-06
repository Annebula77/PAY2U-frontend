import styled from 'styled-components';
import { resetBox } from 'src/styles/mixIns';

export const SubcategoryContainer = styled.section`
  width: 100%;
  box-sizing: border-box;
  margin: 12px 0 12px;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 375px;
`;

export const LogoContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 32px 16px 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const BenefitContainer = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0 16px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TariffContainer = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 32px 0 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Icon = styled.img`
  ${resetBox()};
  display: inline-block;
  border-radius: 12px;
  width: 40px;
  height: 40px;
`;

export const MainImage = styled.img`
  width: 375px;
  z-index: 1;
`;

export const StyledHeartButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  outline: none;
  border: none;
  background-color: transparent;
  z-index: 10;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;
