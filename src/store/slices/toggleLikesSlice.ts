import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import postData from 'src/utils/requests/postData';
import deleteData from 'src/utils/requests/deleteData';
import {
  type FavoriteSubscriptionModel,
  favoriteSubscriptionSchema,
} from 'src/models/favoriteSubscriptionSchema';
import {
  toggleLikeSchema,
  type ToggleLikeModel,
} from 'src/models/toggleLikeSchema';
import { RootState } from '../store';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const addFavorite = createAsyncThunk<
  FavoriteSubscriptionModel,
  ToggleLikeModel,
  { rejectWithValue: string; state: RootState }
>('favorites/add', async ({ subscription }, { getState, rejectWithValue }) => {
  const token = getState().token.access_token;
  const url = `${BASE_URL}subscriptions/favourites/add/`;
  const body = { subscription: subscription };

  try {
    return await postData<FavoriteSubscriptionModel, typeof body>(
      url,
      favoriteSubscriptionSchema,
      toggleLikeSchema,
      body,
      null, // Params
      rejectWithValue,
      token
    );
  } catch (error) {
    return rejectWithValue('Не удалось добавить в избранное');
  }
});

export const removeFavorite = createAsyncThunk<
  void,
  ToggleLikeModel,
  { rejectWithValue: string; state: RootState }
>(
  'favorites/remove',
  async ({ subscription }, { getState, rejectWithValue }) => {
    const token = getState().token.access_token;
    const url = `${BASE_URL}subscriptions/favourites/delete/`;
    const body = { subscription: subscription };
    try {
      await deleteData<typeof body>(
        url,
        toggleLikeSchema,
        body,
        null,
        rejectWithValue,
        token
      );
    } catch (error) {
      return rejectWithValue('Не удалось удалить из избранного');
    }
  }
);

interface InitialStateProps {
  subscription: FavoriteSubscriptionModel | null;
  loading: boolean;
  error: string | null;
}
const initialState: InitialStateProps = {
  subscription: null,
  loading: false,
  error: null,
};

const toggleLikesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addFavorite.pending, state => {
        state.loading = true;
      })
      .addCase(addFavorite.fulfilled, state => {
        state.loading = false;
        if (!state.subscription) {
          return;
        }
        state.subscription.subscription.is_liked = true;
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(removeFavorite.pending, state => {
        state.loading = true;
      })
      .addCase(removeFavorite.fulfilled, state => {
        state.loading = false;
        if (!state.subscription) {
          return;
        }
        state.subscription.subscription.is_liked = false;
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default toggleLikesSlice.reducer;
