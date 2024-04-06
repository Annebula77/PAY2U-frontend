import styled from 'styled-components';

export const BankDetailsWrapping = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin: 0 0 -7px;
  padding: 12px 0 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.palette.secondary.main};
`;

export const InsideWrapping = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
