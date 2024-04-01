import { configureStore } from '@reduxjs/toolkit';
import cookiesReducer from './slices/cookiesSlice';
import tokenReducer from './slices/tokenSlice';
import allSubscriptionsReducer from './slices/allSubscriptionsSlice';
import singleSubscriptionReducer from './slices/singleSubscriptionSlice';
import categoriesReducer from './slices/categoriesSlice';
import clientByIdReducer from './slices/clientByIdSlice';
import clientSubscriptionsReducer from './slices/clientSubscriptionsSlice';

export const store = configureStore({
  reducer: {
    cookies: cookiesReducer,
    token: tokenReducer,
    allSubscriptions: allSubscriptionsReducer,
    subscription: singleSubscriptionReducer,
    categories: categoriesReducer,
    client: clientByIdReducer,
    clientSubscriptions: clientSubscriptionsReducer,
  },
});

// NOTE: Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// NOTE: Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
