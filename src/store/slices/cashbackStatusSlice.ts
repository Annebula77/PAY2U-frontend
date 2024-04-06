import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { type RootState } from '../store'; //
import {
  type CashbackStatusResponseModel,
  cashbackStatusResponseSchema,
} from '../../models/updateCashbackStatusResponseSchema';
import {
  type StatusRequestBodyModel,
  statusRequestBodySchema,
} from '../../models/updateCashbackStatusSchema';
import { CLIENT_URL } from '../../utils/variables';
import patchData from '../../utils/requests/patchData';

export const cashbackStatus = createAsyncThunk<
  CashbackStatusResponseModel,
  { cashback_id: number; status: StatusRequestBodyModel['status'] },
  { rejectWithValue: string; state: RootState }
>(
  'cashback/updateStatus',
  async ({ cashback_id, status }, { getState, rejectWithValue }) => {
    const token = getState().token.access_token;
    const url = `${CLIENT_URL}cashback-history/${cashback_id}/change-status/`;
    const body = { status };

    try {
      return await patchData<CashbackStatusResponseModel, typeof body>(
        url,
        cashbackStatusResponseSchema,
        statusRequestBodySchema,
        body,
        rejectWithValue,
        token
      );
    } catch (error) {
      return rejectWithValue('Не удалось обновить статус кешбэка');
    }
  }
);

interface ProlongationState {
  loading: boolean;
  error: string | null;
}

const initialState: ProlongationState = {
  loading: false,
  error: null,
};

const cashbackStatusSlice = createSlice({
  name: 'prolongation',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(cashbackStatus.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(cashbackStatus.fulfilled, state => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(cashbackStatus.rejected, (state, action) => {
      state.loading = false;
      state.error =
        typeof action.payload === 'string'
          ? action.payload
          : 'Произошла неизвестная ошибка';
    });
  },
});

export default cashbackStatusSlice.reducer;
