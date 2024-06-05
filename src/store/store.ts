import { configureStore } from '@reduxjs/toolkit';
import cookiesReducer from './slices/cookiesSlice';
import tokenReducer from './slices/tokenSlice';
import allSubscriptionsReducer from './slices/allSubscriptionsSlice';
import singleSubscriptionReducer from './slices/singleSubscriptionSlice';
import categoriesReducer from './slices/categoriesSlice';
import clientByIdReducer from './slices/clientByIdSlice';
import clientSubscriptionsReducer from './slices/clientSubscriptionsSlice';
import favoriteSubscriptionsReducer from './slices/favoriteSubscriptionsSlice';
import toggleLikesReducer from './slices/toggleLikesSlice';
import formReducer from './slices/formSlice';
import addSubscriptionReducer from './slices/addSubscriptionSlice';
import deleteSubscriptionReducer from './slices/deleteSubscriptionSlice';
import cashbackStatusReducer from './slices/cashbackStatusSlice';
import prolongationReducer from './slices/prolongationSlice';
import cashbackHistoryReducer from './slices/cashbackHistorySlice';
import activeTabReducer from './slices/activeTabSlice';

export const store = configureStore({
  reducer: {
    cookies: cookiesReducer,
    token: tokenReducer,
    allSubscriptions: allSubscriptionsReducer,
    subscription: singleSubscriptionReducer,
    categories: categoriesReducer,
    client: clientByIdReducer,
    clientSubscriptions: clientSubscriptionsReducer,
    favorites: favoriteSubscriptionsReducer,
    toggleLikes: toggleLikesReducer,
    form: formReducer,
    addForm: addSubscriptionReducer,
    deleteSubscription: deleteSubscriptionReducer,
    cashbackStatus: cashbackStatusReducer,
    cashbackHistory: cashbackHistoryReducer,
    prolongation: prolongationReducer,
    tabs: activeTabReducer,
  },
});

// NOTE: Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// NOTE: Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
