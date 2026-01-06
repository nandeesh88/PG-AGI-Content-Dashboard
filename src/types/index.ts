// src/types/index.ts (unchanged)
// Make sure this file has your ContentItem union type as before:
// ContentItem = NewsArticle | Recommendation | SocialPost

// Example data mapping in index.ts or your main dashboard file:

import { ContentItem, ContentType, NewsArticle, Recommendation, SocialPost } from '@/types';

// Sample data (replace with your API fetch logic)
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

// Combine all content types into unified array
export const contentItems: ContentItem[] = [...news, ...recommendations, ...socialPosts];

// Optional: helper to filter by type
export const getContentByType = (type?: ContentType): ContentItem[] => {
  if (!type) return contentItems;
  return contentItems.filter((item) => item.type === type);
};
