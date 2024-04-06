import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addSubscriptionSchema,
  type AddSubscriptionModel,
} from 'src/models/addSubscriptionSchema';
import { type RootState } from '../store';
import postData from 'src/utils/requests/postData';
import { CLIENT_URL } from 'src/utils/variables';

export const addSubscription = createAsyncThunk<
  AddSubscriptionModel,
  AddSubscriptionModel,
  { rejectWithValue: string; state: RootState }
>(
  'subscriptions/add',
  async (subscriptionData, { getState, rejectWithValue }) => {
    const token = getState().token.access_token;
    const url = `${CLIENT_URL}subscriptions/create/`;

    try {
      const response = await postData(
        url,
        addSubscriptionSchema,
        addSubscriptionSchema,
        subscriptionData,
        null,
        rejectWithValue,
        token
      );
      return response;
    } catch (error) {
      return rejectWithValue('Не удалось добавить подписку');
    }
  }
);

interface SubscriptionState {
  loading: boolean;
  error: string | null;
  data: AddSubscriptionModel | null;
}

const initialState: SubscriptionState = {
  loading: false,
  error: null,
  data: null,
};

const addSubscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addSubscription.pending, state => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(addSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default addSubscriptionsSlice.reducer;
