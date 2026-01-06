// src/types/index.ts

// Content Types
export type ContentType = 'news' | 'recommendation' | 'social' | 'post'; // ✅ Added 'post'

export interface BaseContent {
  id: string;
  type: ContentType;
  title: string;
  description?: string;
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
  content?: string;
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

// UI Component Props
export interface ContentCardProps {
  item: ContentItem;
  onFavorite: (item: ContentItem) => void;
  isFavorite: boolean;
  isDraggable?: boolean;
}
