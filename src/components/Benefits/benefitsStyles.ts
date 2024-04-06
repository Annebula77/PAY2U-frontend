import { resetBox } from 'src/styles/mixIns';
import styled from 'styled-components';

export const BenefitContainer = styled.div`
  ${resetBox()};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
export const Icon = styled.img`
  ${resetBox()};
  display: inline-block;
  width: 28px;
  height: 28px;
  margin-right: 10px;
`;
