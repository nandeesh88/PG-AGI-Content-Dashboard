// src/types/index.ts

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

// ✅ Explicitly export ContentItem type
export type ContentItem = NewsArticle | Recommendation | SocialPost;

// Example data
const news: NewsArticle[] = [
  {
    id: '1',
    type: 'news',
    title: 'Breaking News!',
    category: 'World',
    source: 'BBC',
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    description: 'This is the description of the news article.',
    url: 'https://www.bbc.com/news',
  },
];

const recommendations: Recommendation[] = [
  {
    id: '2',
    type: 'recommendation',
    title: 'Watch This Movie',
    rating: 4.5,
    genre: 'Action',
    createdAt: new Date().toISOString(),
  },
];

const socialPosts: SocialPost[] = [
  {
    id: '3',
    type: 'social',
    title: 'Check this out!',
    username: 'johndoe',
    content: 'This is a social post content.',
    likes: 120,
    timestamp: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
];

// ✅ Export the array for your components
export const contentItems: ContentItem[] = [...news, ...recommendations, ...socialPosts];

// Optional: helper
export const getContentByType = (type?: ContentType): ContentItem[] => {
  if (!type) return contentItems;
  return contentItems.filter((item) => item.type === type);
};
