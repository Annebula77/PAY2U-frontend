import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchData from '../../utils/fetchData';
import { BASE_URL } from '../../utils/variables';
import { categoryListSchema, type CategoryListModel, type CategoryModel } from '../../models/categorySchema';


export const fetchCategoryList = createAsyncThunk<CategoryListModel, void, { rejectValue: string }>(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    const url = `${BASE_URL}/subscriptions/categories/`;
    return fetchData(url, categoryListSchema, rejectWithValue);
  }
);


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
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryList.pending, (state) => {
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
