import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ContentItem } from '@/types';

interface ContentState {
  items: ContentItem[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  filters: {
    searchQuery: string;
    category?: string;
    type?: string;
  };
}

const initialState: ContentState = {
  items: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
  filters: {
    searchQuery: '',
  },
};

export const fetchAllContent = createAsyncThunk(
  'content/fetchAll',
  async ({ categories, page }: { categories: string[]; page: number }) => {
    // Mock data for now
    return [];
  }
);

export const fetchMoreContent = createAsyncThunk(
  'content/fetchMore',
  async ({ categories, page }: { categories: string[]; page: number }) => {
    return [];
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filters.searchQuery = action.payload;
    },
    setCategory: (state, action: PayloadAction<string | undefined>) => {
      state.filters.category = action.payload;
    },
    reorderContent: (state, action: PayloadAction<{ oldIndex: number; newIndex: number }>) => {
      const { oldIndex, newIndex } = action.payload;
      const [removed] = state.items.splice(oldIndex, 1);
      state.items.splice(newIndex, 0, removed);
    },
    resetContent: (state) => {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllContent.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchAllContent.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch content';
      });
  },
});

export const { setSearchQuery, setCategory, reorderContent, resetContent } = contentSlice.actions;
export default contentSlice.reducer;