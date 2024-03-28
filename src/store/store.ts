import { configureStore } from '@reduxjs/toolkit';
import cookiesReducer from './slices/cookiesSlice';


export const store = configureStore({
  reducer: {
    cookies: cookiesReducer,
  },
});

// NOTE: Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// NOTE: Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;