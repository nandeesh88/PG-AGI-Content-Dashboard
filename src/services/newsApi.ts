import axios from 'axios';
import { NewsArticle, NewsAPIResponse } from '@/types';

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY || '';
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

// Create axios instance
const newsApiClient = axios.create({
  baseURL: NEWS_API_BASE_URL,
  headers: {
    'X-Api-Key': NEWS_API_KEY,
  },
});

// Mock data generator for development/testing
const generateMockNews = (category: string, count: number = 10): NewsArticle[] => {
  const titles = {
    technology: ['AI Breakthrough Announced', 'New Smartphone Features', 'Cybersecurity Alert', 'Tech Startup IPO'],
    sports: ['Championship Victory', 'Record-Breaking Performance', 'Major Transfer News', 'Olympic Qualification'],
    finance: ['Market Reaches New High', 'Cryptocurrency Surge', 'Economic Forecast Released', 'Investment Strategy'],
    entertainment: ['Blockbuster Release', 'Award Ceremony Highlights', 'Celebrity Interview', 'Streaming Service Launch'],
    health: ['Medical Research Breakthrough', 'Wellness Study Results', 'Fitness Innovation', 'Mental Health Awareness'],
    general: ['Breaking News Update', 'Global Event Coverage', 'Important Announcement', 'Trending Topic'],
  };

  const selectedTitles = titles[category as keyof typeof titles] || titles.general;

  return Array.from({ length: count }, (_, i) => ({
    id: `news-${category}-${Date.now()}-${i}`,
    type: 'news' as const,
    title: `${selectedTitles[i % selectedTitles.length]} - ${new Date().toLocaleDateString()}`,
    description: 'Stay informed with the latest developments in this important story. Our reporters bring you comprehensive coverage with expert analysis and insights.',
    image: `https://picsum.photos/seed/${category}-${i}/800/600`,
    url: `https://example.com/news/${category}/${i}`,
    category,
    source: 'News Network',
    author: `Reporter ${i + 1}`,
    publishedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    content: 'Full article content would appear here with detailed information and analysis.',
  }));
};

/**
 * Fetch news articles by category
 */
export const fetchNews = async (
  category: string = 'general',
  page: number = 1,
  pageSize: number = 10
): Promise<NewsArticle[]> => {
  // Use mock data if API key is not available
  if (!NEWS_API_KEY || NEWS_API_KEY === 'your_newsapi_key_here') {
    return generateMockNews(category, pageSize);
  }

  try {
    const response = await newsApiClient.get<NewsAPIResponse>('/top-headlines', {
      params: {
        category,
        page,
        pageSize,
        language: 'en',
      },
    });

    return response.data.articles.map((article, index) => ({
      id: `news-${Date.now()}-${index}`,
      type: 'news' as const,
      title: article.title,
      description: article.description || '',
      image: article.urlToImage || undefined,
      url: article.url,
      category,
      source: article.source.name,
      author: article.author || undefined,
      publishedAt: article.publishedAt,
      createdAt: new Date().toISOString(),
      content: article.content || undefined,
    }));
  } catch (error) {
    console.error('Error fetching news:', error);
    // Fallback to mock data on error
    return generateMockNews(category, pageSize);
  }
};

/**
 * Search news articles
 */
export const searchNews = async (
  query: string,
  page: number = 1,
  pageSize: number = 10
): Promise<NewsArticle[]> => {
  if (!NEWS_API_KEY || NEWS_API_KEY === 'your_newsapi_key_here') {
    // Return filtered mock data
    const mockData = generateMockNews('general', 50);
    return mockData.filter(article =>
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.description?.toLowerCase().includes(query.toLowerCase())
    ).slice(0, pageSize);
  }

  try {
    const response = await newsApiClient.get<NewsAPIResponse>('/everything', {
      params: {
        q: query,
        page,
        pageSize,
        language: 'en',
        sortBy: 'publishedAt',
      },
    });

    return response.data.articles.map((article, index) => ({
      id: `news-search-${Date.now()}-${index}`,
      type: 'news' as const,
      title: article.title,
      description: article.description || '',
      image: article.urlToImage || undefined,
      url: article.url,
      category: 'general',
      source: article.source.name,
      author: article.author || undefined,
      publishedAt: article.publishedAt,
      createdAt: new Date().toISOString(),
      content: article.content || undefined,
    }));
  } catch (error) {
    console.error('Error searching news:', error);
    return [];
  }
};

export default {
  fetchNews,
  searchNews,
};