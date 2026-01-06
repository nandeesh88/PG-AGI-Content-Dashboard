import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PreferencesState, ContentType } from '@/types';

const initialState: PreferencesState = {
  categories: ['technology', 'sports', 'finance'],
  contentTypes: ['news', 'recommendation', 'social'],
  language: 'en',
  theme: 'light',
  notificationsEnabled: true,
  isLoading: false,
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    toggleCategory: (state, action: PayloadAction<string>) => {
      const index = state.categories.indexOf(action.payload);
      
      if (index >= 0) {
        state.categories.splice(index, 1);
      } else {
        state.categories.push(action.payload);
      }
    },
    setContentTypes: (state, action: PayloadAction<ContentType[]>) => {
      state.contentTypes = action.payload;
    },
    toggleContentType: (state, action: PayloadAction<ContentType>) => {
      const index = state.contentTypes.indexOf(action.payload);
      
      if (index >= 0 && state.contentTypes.length > 1) {
        // Don't allow removing all content types
        state.contentTypes.splice(index, 1);
      } else if (index < 0) {
        state.contentTypes.push(action.payload);
      }
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setNotifications: (state, action: PayloadAction<boolean>) => {
      state.notificationsEnabled = action.payload;
    },
    resetPreferences: () => initialState,
  },
});

export const {
  setCategories,
  toggleCategory,
  setContentTypes,
  toggleContentType,
  setLanguage,
  setTheme,
  toggleTheme,
  setNotifications,
  resetPreferences,
} = preferencesSlice.actions;

export default preferencesSlice.reducer;