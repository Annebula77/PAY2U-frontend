import styled from 'styled-components';
import { resetBox } from 'src/styles/mixIns';

export const NameContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 33px 0 26px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  && > :last-child {
    margin-top: -12px;
  }
`;

export const FormWrapping = styled.form`
  ${resetBox()};
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 100%;
  gap: 12px;
`;

export const SwitchWrapping = styled.div`
  ${resetBox()};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: 16px 0 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;
