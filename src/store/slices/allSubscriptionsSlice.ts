import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import fetchData from 'src/utils/requests/fetchData';
import {
  allSubscriptionsResponseSchema,
  type AllSubscriptionsResponseModel,
} from 'src/models/allSubscriptionsSchema';
import { BASE_URL } from 'src/utils/variables';
import { type SingleSubScriptionModel } from 'src/models/singleSubscriptionSchema';

interface FetchSubscriptionsParams {
  recommended?: boolean;
}

export const fetchSubscriptions = createAsyncThunk<
  AllSubscriptionsResponseModel,
  FetchSubscriptionsParams,
  { rejectValue: string; state: RootState }
>(
  'subscriptions/fetchAll',
  async ({ recommended }, { rejectWithValue, getState }) => {
    const token = getState().token.access_token;
    let url = `${BASE_URL}subscriptions/list`;
    if (recommended) {
      url += '?is_recommended=true';
    }
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
  count: number;
  loading: boolean;
  error: string | null;
}

const initialState: SubscriptionsStateProps = {
  data: [],
  recommendedData: [],
  count: 0,
  loading: false,
  error: null,
};

const allSubscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSubscriptions.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        if (action.meta.arg.recommended) {
          state.recommendedData = action.payload.results;
        } else {
          state.data = action.payload.results;
          state.count = action.payload.count;
        }
        state.error = null;
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default allSubscriptionsSlice.reducer;
