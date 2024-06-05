import { createSlice } from '@reduxjs/toolkit';

interface ActiveTabSliceProps {
  activeTab: string;
  filter: string;
}

const initialState: ActiveTabSliceProps = {
  activeTab: '1',
  filter: 'all',
}

const activeTabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    }
  }
});

export const { setActiveTab, setFilter } = activeTabSlice.actions;
export default activeTabSlice.reducer;