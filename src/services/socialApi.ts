import { SocialPost } from '@/types';

// Mock social posts generator
const generateMockSocialPosts = (count: number = 15): SocialPost[] => {
  const usernames = ['techguru', 'traveladdict', 'foodiefan', 'fitnesscoach', 'bookworm', 'musiclover', 'photographer', 'developer'];
  const hashtags = [
    ['#technology', '#innovation', '#AI'],
    ['#travel', '#wanderlust', '#adventure'],
    ['#food', '#cooking', '#delicious'],
    ['#fitness', '#health', '#workout'],
    ['#books', '#reading', '#literature'],
    ['#music', '#concert', '#playlist'],
    ['#photography', '#art', '#creative'],
    ['#coding', '#programming', '#webdev'],
  ];

  const contents = [
    'Just discovered something amazing! The future is here and it\'s incredible.',
    'Having the best time exploring new places. Life is an adventure!',
    'This recipe changed my life. You have to try it!',
    'Consistency is key. Keep pushing forward!',
    'Currently reading this masterpiece. Highly recommend!',
    'This song is on repeat all day. Pure perfection!',
    'Captured this moment at golden hour. Nature is beautiful.',
    'Working on an exciting new project. Stay tuned!',
  ];

  return Array.from({ length: count }, (_, i) => {
    const userIndex = i % usernames.length;
    
    return {
      id: `social-${Date.now()}-${i}`,
      type: 'social' as const,
      title: `Post by @${usernames[userIndex]}`,
      username: usernames[userIndex],
      content: contents[userIndex],
      image: Math.random() > 0.4 ? `https://picsum.photos/seed/social-${i}/600/600` : undefined,
      likes: Math.floor(Math.random() * 5000) + 100,
      comments: Math.floor(Math.random() * 500) + 10,
      timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
      hashtags: hashtags[userIndex],
      createdAt: new Date().toISOString(),
    };
  });
};

/**
 * Fetch social media posts
 * Note: This uses mock data. In production, integrate with actual social media APIs
 * like Twitter API v2, Instagram Graph API, etc.
 */
export const fetchSocialPosts = async (
  hashtag?: string,
  count: number = 15
): Promise<SocialPost[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const posts = generateMockSocialPosts(count);

  // Filter by hashtag if provided
  if (hashtag) {
    return posts.filter(post =>
      post.hashtags?.some(tag => 
        tag.toLowerCase().includes(hashtag.toLowerCase())
      )
    );
  }

  return posts;
};

/**
 * Search social media posts
 */
export const searchSocialPosts = async (
  query: string,
  count: number = 15
): Promise<SocialPost[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const posts = generateMockSocialPosts(50);

  return posts.filter(post =>
    post.content.toLowerCase().includes(query.toLowerCase()) ||
    post.username.toLowerCase().includes(query.toLowerCase()) ||
    post.hashtags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  ).slice(0, count);
};

/**
 * Fetch posts by user
 */
export const fetchUserPosts = async (
  username: string,
  count: number = 10
): Promise<SocialPost[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const posts = generateMockSocialPosts(count);

  return posts.map(post => ({
    ...post,
    username,
  }));
};

export default {
  fetchSocialPosts,
  searchSocialPosts,
  fetchUserPosts,
};