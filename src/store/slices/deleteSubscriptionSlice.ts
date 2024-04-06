import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import deleteData from 'src/utils/requests/deleteData';
import { CLIENT_URL } from 'src/utils/variables';
import { RootState } from '../store';
import { type DeleteSubscriptionModel } from '../../models/deleteSubscriptionSchema';

export const deleteSubscription = createAsyncThunk<
  void,
  DeleteSubscriptionModel,
  { rejectWithValue: string; state: RootState }
>(
  'favorites/remove',
  async ({ subscription_id }, { getState, rejectWithValue }) => {
    const token = getState().token.access_token;
    const url = `${CLIENT_URL}subscriptions/${subscription_id}/delete/`;
    try {
      await deleteData(url, null, null, null, rejectWithValue, token);
    } catch (error) {
      return rejectWithValue('Не удалось удалить подписку');
    }
  }
);

const deleteSubscriptionSlice = createSlice({
  name: 'delete subscription',
  initialState: {
    loading: false,
    error: null || '',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(deleteSubscription.pending, state => {
        state.loading = true;
        state.error = null || '';
      })
      .addCase(deleteSubscription.fulfilled, state => {
        state.loading = false;
      })
      .addCase(deleteSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default deleteSubscriptionSlice.reducer;
