import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import fetchData from 'src/utils/requests/fetchData';
import { BASE_URL } from 'src/utils/variables';
import {
  type SingleSubScriptionModel,
  singleSubscriptionSchema,
} from 'src/models/singleSubscriptionSchema';

export const fetchSingleSubscription = createAsyncThunk<
  SingleSubScriptionModel,
  number,
  { rejectValue: string; state: RootState }
>(
  'subscription/fetchSingle',
  async (subscription_id, { rejectWithValue, getState }) => {
    const token = getState().token.access_token;
    const url = `${BASE_URL}/subscriptions/${subscription_id}`;
    return fetchData(url, singleSubscriptionSchema, rejectWithValue, token);
  }
);

interface SingleSubscriptionSliceProps {
  data: SingleSubScriptionModel | null;
  loading: boolean;
  error: string | null;
}

const initialState: SingleSubscriptionSliceProps = {
  data: null,
  loading: false,
  error: null,
};

const singleSubscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSingleSubscription.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchSingleSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default singleSubscriptionSlice.reducer;
