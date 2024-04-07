import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import fetchData from 'src/utils/requests/fetchData';
import {
  categoryListSchema,
  type CategoryListModel,
  type CategoryModel,
} from 'src/models/categorySchema';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchCategoryList = createAsyncThunk<
  CategoryListModel,
  void,
  { rejectValue: string; state: RootState }
>('categories/fetchCategories', async (_, { rejectWithValue, getState }) => {
  const token = getState().token.access_token;
  const url = `${BASE_URL}/subscriptions/categories/`;
  return fetchData(url, categoryListSchema, rejectWithValue, token);
});

interface CategoriesProps {
  data: CategoryModel[];
  count: number;
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesProps = {
  data: [],
  count: 0,
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategoryList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.results;
        state.count = action.payload.count;
        state.error = null;
      })
      .addCase(fetchCategoryList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default categoriesSlice.reducer;
