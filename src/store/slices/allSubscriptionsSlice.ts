import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import fetchData from 'src/utils/requests/fetchData';
import {
  allSubscriptionsResponseSchema,
  type AllSubscriptionsResponseModel,
} from 'src/models/allSubscriptionsSchema';
import { type SingleSubScriptionModel } from 'src/models/singleSubscriptionSchema';

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface FetchSubscriptionsParams {
  recommended?: boolean;
  ordering?: string;
  search?: string;
}

export const fetchSubscriptions = createAsyncThunk<
  AllSubscriptionsResponseModel,
  FetchSubscriptionsParams,
  { rejectValue: string; state: RootState }
>(
  'subscriptions/fetchAll',
  async ({ recommended, ordering, search }, { rejectWithValue, getState }) => {
    const token = getState().token.access_token;
    let url = `${BASE_URL}subscriptions/list`;

    const params = new URLSearchParams();
    if (recommended) {
      params.append('is_recommended', 'true');
    }
    if (ordering) {
      params.append('ordering', ordering);
    }
    if (search) {
      params.append('search', search);
    }
    url += `?${params.toString()}`;

    return fetchData(
      url,
      allSubscriptionsResponseSchema,
      rejectWithValue,
      token
    );
  }
);

interface SubscriptionsStateProps {
  data: SingleSubScriptionModel[];
  recommendedData: SingleSubScriptionModel[];
  sortByPopularity: SingleSubScriptionModel[];
  sortByTariffAmount: SingleSubScriptionModel[];
  sortByCashbackAmount: SingleSubScriptionModel[];
  count: number;
  loading: boolean;
  error: string | null;
}

const initialState: SubscriptionsStateProps = {
  data: [],
  recommendedData: [],
  sortByPopularity: [],
  sortByTariffAmount: [],
  sortByCashbackAmount: [],
  count: 0,
  loading: false,
  error: null,
};

const allSubscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {
    // Ваши редьюсеры
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSubscriptions.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        const { recommended, ordering } = action.meta.arg;

        if (recommended) {
          state.recommendedData = action.payload.results;
        } else if (ordering === 'subscription_tariff__amount') {
          state.sortByTariffAmount = action.payload.results;
        } else if (ordering === '-popularity') {
          state.sortByPopularity = action.payload.results;
        } else if (ordering === '-cashback__amount') {
          state.sortByCashbackAmount = action.payload.results;
        } else {
          state.data = action.payload.results;
        }

        state.count = action.payload.count;
        state.error = null;
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default allSubscriptionsSlice.reducer;
