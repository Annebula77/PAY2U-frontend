import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import fetchData from 'src/utils/fetchData';
import { BASE_URL } from 'src/utils/variables';
import {
  type ClientByIdModel,
  clientByIdSchema,
} from 'src/models/clientByIdSchema';

export const fetchClientById = createAsyncThunk<
  ClientByIdModel,
  number,
  { rejectValue: string; state: RootState }
>(
  'client/fetchClientById',
  async (client_id, { rejectWithValue, getState }) => {
    const token = getState().token.access_token;
    const url = `${BASE_URL}/clients/${client_id}`;
    return fetchData(url, clientByIdSchema, rejectWithValue, token);
  }
);

interface ClientByIdProps {
  data: ClientByIdModel | null;
  loading: boolean;
  error: string | null;
}

const initialState: ClientByIdProps = {
  data: null,
  loading: false,
  error: null,
};

const clientByIdSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchClientById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchClientById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default clientByIdSlice.reducer;
