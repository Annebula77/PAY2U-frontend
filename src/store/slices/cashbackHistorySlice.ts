import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import fetchData from 'src/utils/requests/fetchData';
import {
  type PaginatedCashbackHistoryOutputModel,
  paginatedCashbackHistoryOutputSchema,
  type CashbackHistoryOutputModel,
} from 'src/models/cashbackHistorySchema';

const CLIENT_URL = import.meta.env.VITE_CLIENT_URL;

export const fetchCashbackHistory = createAsyncThunk<
  PaginatedCashbackHistoryOutputModel,
  void,
  { rejectValue: string; state: RootState }
>('cashback/fetchCashbackList', async (_, { rejectWithValue, getState }) => {
  const token = getState().token.access_token;
  const url = `${CLIENT_URL}cashback-history`;
  return fetchData(
    url,
    paginatedCashbackHistoryOutputSchema,
    rejectWithValue,
    token
  );
});

interface CashbackHistoryProps {
  results: CashbackHistoryOutputModel[];
  count: number;
  loading: boolean;
  error: string | null;
}

const initialState: CashbackHistoryProps = {
  results: [],
  count: 0,
  loading: false,
  error: null,
};

const cashbackHistorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCashbackHistory.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCashbackHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.results;
        state.count = action.payload.count;
        state.error = null;
      })
      .addCase(fetchCashbackHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default cashbackHistorySlice.reducer;
