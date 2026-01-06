// Content Types
export type ContentType = 'news' | 'recommendation' | 'social';

export interface BaseContent {
  id: string;
  type: ContentType;
  title: string;
  description?: string;
  image?: string;
  url?: string;
  createdAt: string;
}

export interface NewsArticle extends BaseContent {
  type: 'news';
  category: string;
  source: string;
  author?: string;
  publishedAt: string;
  content?: string;
}

export interface Recommendation extends BaseContent {
  type: 'recommendation';
  rating: number;
  genre: string;
  releaseDate?: string;
  popularity?: number;
}

export interface SocialPost extends BaseContent {
  type: 'social';
  username: string;
  content: string;
  likes: number;
  comments?: number;
  timestamp: string;
  hashtags?: string[];
}

export type ContentItem = NewsArticle | Recommendation | SocialPost;

// User Preferences
export interface UserPreferences {
  categories: string[];
  contentTypes: ContentType[];
  language: string;
  theme: 'light' | 'dark';
  notificationsEnabled: boolean;
}

// State Types
export interface ContentState {
  items: ContentItem[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  filters: {
    searchQuery: string;
    category?: string;
    type?: ContentType;
  };
}

export interface FavoritesState {
  items: ContentItem[];
}

export interface PreferencesState extends UserPreferences {
  isLoading: boolean;
}

// API Response Types
export interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: Array<{
    source: { id: string | null; name: string };
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string;
  }>;
}

export interface TMDBResponse {
  page: number;
  results: Array<{
    id: number;
    title?: string;
    name?: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    vote_average: number;
    release_date?: string;
    first_air_date?: string;
    genre_ids: number[];
  }>;
  total_pages: number;
  total_results: number;
}

// UI Component Props
export interface ContentCardProps {
  item: ContentItem;
  onFavorite: (item: ContentItem) => void;
  isFavorite: boolean;
  isDraggable?: boolean;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  favoriteCount: number;
}

// Drag and Drop
export interface DragItem {
  id: string;
  index: number;
  content: ContentItem;
}

// Authentication
export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Utility Types
export type AsyncThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
};

export type RootState = {
  content: ContentState;
  favorites: FavoritesState;
  preferences: PreferencesState;
};

export type AppDispatch = any; // Will be typed properly in store setup