import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import contentReducer from './slices/contentSlice';
import favoritesReducer from './slices/favoritesSlice';
import preferencesReducer from './slices/preferencesSlice';

const rootReducer = combineReducers({
  content: contentReducer,
  favorites: favoritesReducer,
  preferences: preferencesReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['favorites', 'preferences'], // Only persist these slices
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;