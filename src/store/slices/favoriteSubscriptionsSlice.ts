import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import fetchData from 'src/utils/requests/fetchData';
import {
  type FavoriteSubscriptionsResponseModel,
  favoriteSubscriptionsResponseSchema,
} from 'src/models/favoriteSubscriptionsResponseSchema';
import { type FavoriteSubscriptionModel } from 'src/models/favoriteSubscriptionSchema';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchFavoriteSubscriptions = createAsyncThunk<
  FavoriteSubscriptionsResponseModel,
  void,
  { rejectValue: string; state: RootState }
>('favorites/fetchAllFavorites', async (_, { rejectWithValue, getState }) => {
  const token = getState().token.access_token;
  const url = `${BASE_URL}subscriptions/favourites/`;
  return fetchData(
    url,
    favoriteSubscriptionsResponseSchema,
    rejectWithValue,
    token
  );
});

interface FavoriteSubsStateProps {
  data: FavoriteSubscriptionModel[];
  count: number;
  loading: boolean;
  error: string | null;
}

const initialState: FavoriteSubsStateProps = {
  data: [],
  count: 0,
  loading: false,
  error: null,
};

const favoriteSubscriptionsSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchFavoriteSubscriptions.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavoriteSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.results;
        state.count = action.payload.count;

        state.error = null;
      })
      .addCase(fetchFavoriteSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default favoriteSubscriptionsSlice.reducer;
