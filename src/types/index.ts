// src/types/index.ts

// Content Types
export type ContentType = 'news' | 'recommendation' | 'social' | 'post'; // ✅ Added 'post'

export interface BaseContent {
  id: string;
  type: ContentType;
  title: string;
  description?: string;
  content?: string;
  image?: string;
  url?: string;
  createdAt: string;
}

// News Article
export interface NewsArticle extends BaseContent {
  type: 'news';
  category: string;
  source: string;
  author?: string;
  publishedAt: string;
}

// Recommendation
export interface Recommendation extends BaseContent {
  type: 'recommendation';
  rating: number;
  genre: string;
  releaseDate?: string;
  popularity?: number;
}

// Social Post
export interface SocialPost extends BaseContent {
  type: 'social';
  username: string;
  content: string;
  likes: number;
  comments?: number;
  timestamp: string;
  hashtags?: string[];
}

// Post (new type for "post")
export interface Post extends BaseContent {
  type: 'post';
  content: string;
}

// Union type for all content items
export type ContentItem = NewsArticle | Recommendation | SocialPost | Post;

// News API Response
export interface NewsAPIArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: NewsAPIArticle[];
}

// UI Component Props
export interface ContentCardProps {
  item: ContentItem;
  onFavorite: (item: ContentItem) => void;
  isFavorite: boolean;
  isDraggable?: boolean;
}

// Preferences State
export interface PreferencesState {
  categories: string[];
  contentTypes: ContentType[];
  language: string;
  theme: 'light' | 'dark';
  notificationsEnabled: boolean;
  isLoading: boolean;
}
