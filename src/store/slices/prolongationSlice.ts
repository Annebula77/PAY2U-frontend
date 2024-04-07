import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { type RootState } from '../store'; //
import patchData from 'src/utils/requests/patchData';
import {
  type AutoPaysRequestModel,
  autoPaysRequestSchema,
} from 'src/models/updateAutoPaySchema';

const CLIENT_URL = import.meta.env.VITE_CLIENT_URL;

export const toggleProlongation = createAsyncThunk<
  AutoPaysRequestModel,
  { subscription_id: number; is_auto_pay: boolean },
  { rejectWithValue: string; state: RootState }
>(
  'cashback/updateStatus',
  async ({ subscription_id, is_auto_pay }, { getState, rejectWithValue }) => {
    const token = getState().token.access_token;
    const url = `${CLIENT_URL}subscriptions/${subscription_id}/update/`;
    const body = { is_auto_pay };

    try {
      return await patchData<AutoPaysRequestModel, typeof body>(
        url,
        autoPaysRequestSchema,
        autoPaysRequestSchema,
        body,
        rejectWithValue,
        token
      );
    } catch (error) {
      console.error('Error updating cashback status:', error);
      return rejectWithValue('Не удалось обновить статус кешбэка');
    }
  }
);

interface ProlongationState {
  is_auto_pay: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: ProlongationState = {
  is_auto_pay: false,
  loading: false,
  error: null,
};

const prolongationSlice = createSlice({
  name: 'prolongation',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(toggleProlongation.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(toggleProlongation.fulfilled, (state, action) => {
      state.loading = false;
      state.is_auto_pay = action.payload.is_auto_pay;
      state.error = null;
    });
    builder.addCase(toggleProlongation.rejected, (state, action) => {
      state.loading = false;
      state.error =
        typeof action.payload === 'string'
          ? action.payload
          : 'Произошла неизвестная ошибка';
    });
  },
});

export default prolongationSlice.reducer;
