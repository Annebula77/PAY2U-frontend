import { useEffect } from 'react';
import {
  ControlsContainer,
  SearchContainer,
  StyledSection,
} from '../styles/reusableStyles';
import { useAppSelector, useAppDispatch } from 'src/store/hooks';
import { Link } from 'react-router-dom';
import BackArrowIcon from 'src/components/icons/BackArrowIcon';
import { Typography } from '@mui/material';
import SearchIcon from 'src/components/icons/SearchIcon';
import styled from 'styled-components';
import { resetBox } from 'src/styles/mixIns';
import NoCashbackContent from '../components/NoCashbackContent/NoCashbackContent';
import HasCashbackContent from '../components/HasCashbackContent/HasCashbackContent';
import { fetchClientById } from '../store/slices/clientByIdSlice';

export const NameContainer = styled.div`
  width: 58%;
  ${resetBox()};
  display: flex;
  justify-content: flex-start;
`;

const CashbackPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchClientById());
  }, [dispatch]);

  const hasSubscriptions = useAppSelector(
    state => state.client.data?.subscriptions_count
  );

  return (
    <StyledSection>
      <ControlsContainer>
        <NameContainer>
          <Link
            to="/me"
            style={{ textDecoration: 'none', margin: '0', padding: 0 }}
          >
            <BackArrowIcon />
          </Link>
          <Typography variant="h2" align="left">
            Кешбэк
          </Typography>
        </NameContainer>
        <SearchContainer>
          <Link
            to=""
            style={{
              textDecoration: 'none',
              width: '10%',
              margin: 0,
              padding: 0,
            }}
          >
            <SearchIcon />
          </Link>
        </SearchContainer>
      </ControlsContainer>
      {!hasSubscriptions ? <NoCashbackContent /> : <HasCashbackContent />}
    </StyledSection>
  );
};

export default CashbackPage;
