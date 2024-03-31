import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import fetchData from '../../utils/fetchData';
import { BASE_URL } from '../../utils/variables';
import { clientSubscriptionsSchema, type ClientSubscriptionsModal } from '../../models/clientsSubscriptionsSchema';



interface FetchSubscriptionsParams {
  clientId: number;
  isLiked?: boolean;
  isActive?: boolean;
}

export const fetchClientSubscriptions = createAsyncThunk<ClientSubscriptionsModal, FetchSubscriptionsParams, { rejectValue: string, state: RootState }>(
  'subscriptions/fetchClient',
  async ({ clientId, isLiked, isActive }, { rejectWithValue, getState }) => {
    const token = getState().token.access_token;
    const queryParams = new URLSearchParams();
    if (isLiked !== undefined) queryParams.append('is_liked', isLiked.toString());
    if (isActive !== undefined) queryParams.append('is_active', isActive.toString());
    const url = `${BASE_URL}clients/${clientId}/subscriptions/?${queryParams.toString()}`;
    return fetchData(url, clientSubscriptionsSchema, rejectWithValue, token);
  }
);


interface ClientSubscriptionsProps {
  data: ClientSubscriptionsModal | null;
  loading: boolean;
  error: string | null;
}

const initialState: ClientSubscriptionsProps = {
  data: null,
  loading: false,
  error: null,
};

const clientSubscriptionsSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientSubscriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchClientSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default clientSubscriptionsSlice.reducer;
