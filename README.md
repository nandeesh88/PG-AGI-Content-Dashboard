# 🚀 Personalized Content Dashboard

A modern, feature-rich content dashboard built with Next.js, TypeScript, Redux Toolkit, and Tailwind CSS. This application provides users with a personalized feed of news, recommendations, and social media posts.

![Dashboard Preview](https://via.placeholder.com/1200x600?text=Dashboard+Preview)

## ✨ Features

### Core Features

- **Personalized Content Feed**: Aggregates news, movie/TV recommendations, and social posts
- **Smart Search**: Debounced search with real-time filtering
- **User Preferences**: Customizable categories and content types
- **Favorites System**: Save and organize your favorite content
- **Trending Section**: Discover popular content
- **Dark Mode**: Full dark mode support with smooth transitions
- **Responsive Design**: Mobile-first design that works on all devices

### Advanced Features

- **Drag & Drop**: Reorder content cards in favorites using @dnd-kit
- **Infinite Scrolling**: Load more content as you scroll
- **State Persistence**: Redux Persist keeps your preferences across sessions
- **Animations**: Smooth transitions and micro-interactions with Framer Motion
- **Testing**: Comprehensive unit, integration, and E2E tests

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **State Management**: Redux Toolkit with Redux Persist
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Drag & Drop**: @dnd-kit
- **Testing**: Jest, React Testing Library, Cypress
- **API Integration**: Axios
- **Icons**: Lucide React
- **Date Formatting**: date-fns

## 📋 Prerequisites

- Node.js 18+ and npm
- Git

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/content-dashboard.git
cd content-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# API Keys (Optional - Mock data works without these)
NEXT_PUBLIC_NEWS_API_KEY=your_newsapi_key_here
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_key_here
NEXT_PUBLIC_TWITTER_BEARER_TOKEN=your_twitter_token_here

# NextAuth (if implementing authentication)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here
```

**Note**: The application works with mock data if API keys are not provided.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
content-dashboard/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home page
│   │   ├── providers.tsx        # Redux & Theme providers
│   │   └── globals.css          # Global styles
│   ├── components/              # React components
│   │   ├── Dashboard/           # Dashboard components
│   │   │   ├── ContentCard.tsx
│   │   │   ├── ContentGrid.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── SettingsPanel.tsx
│   │   └── DragDrop/            # Drag & drop components
│   │       └── DraggableGrid.tsx
│   ├── store/                   # Redux store
│   │   ├── index.ts             # Store configuration
│   │   ├── hooks.ts             # Typed Redux hooks
│   │   └── slices/              # Redux slices
│   │       ├── contentSlice.ts
│   │       ├── favoritesSlice.ts
│   │       └── preferencesSlice.ts
│   ├── services/                # API services
│   │   ├── newsApi.ts
│   │   ├── tmdbApi.ts
│   │   └── socialApi.ts
│   ├── types/                   # TypeScript types
│   │   └── index.ts
│   ├── utils/                   # Utility functions
│   │   └── debounce.ts
│   └── __tests__/               # Test files
│       ├── components/
│       └── store/
├── cypress/                     # E2E tests
│   └── e2e/
│       └── dashboard.cy.ts
├── public/                      # Static assets
├── .env.local                   # Environment variables
├── .env.example                 # Example env file
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
├── jest.config.js              # Jest configuration
├── cypress.config.ts           # Cypress configuration
└── package.json                # Dependencies
```

## 🧪 Testing

### Unit Tests

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### End-to-End Tests

```bash
# Open Cypress Test Runner
npm run cypress

# Run Cypress headless
npm run cypress:headless
```

## 📱 Key Features Guide

### Search Functionality

The search bar implements debounced search with a 500ms delay:

```typescript
// Automatic debouncing in the component
useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(searchQuery);
  }, 500);
  return () => clearTimeout(timer);
}, [searchQuery]);
```

### Favorites System

Add items to favorites with Redux:

```typescript
import { toggleFavorite } from "@/store/slices/favoritesSlice";

// In component
dispatch(toggleFavorite(item));
```

### Drag and Drop

Enable drag and drop in the Favorites section:

```typescript
// DraggableGrid component uses @dnd-kit
<DraggableGrid
  items={content}
  onReorder={handleReorder}
  onFavorite={handleFavorite}
  favorites={favorites}
/>
```

### Dark Mode

Dark mode is managed through Redux and persisted:

```typescript
import { toggleTheme } from "@/store/slices/preferencesSlice";

// Toggle dark mode
dispatch(toggleTheme());
```

## 🎨 Customization

### Adding New Content Types

1. Add type to `src/types/index.ts`:

```typescript
export interface CustomContent extends BaseContent {
  type: "custom";
  customField: string;
}
```

2. Create API service in `src/services/customApi.ts`
3. Update `contentSlice.ts` to fetch custom content
4. Add UI handling in components

### Styling

The application uses Tailwind CSS. Customize the theme in `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
    },
  },
}
```

## 🌐 API Integration

### News API

Get your API key from [NewsAPI.org](https://newsapi.org/)

```typescript
// Example: Fetch news by category
const news = await fetchNews("technology", 1);
```

### TMDB API

Get your API key from [The Movie Database](https://www.themoviedb.org/)

```typescript
// Example: Fetch recommendations
const recommendations = await fetchRecommendations("movie", 1);
```

### Social Media API

The current implementation uses mock data. To integrate real social media:

1. Get API credentials from Twitter, Instagram, etc.
2. Update `src/services/socialApi.ts`
3. Implement OAuth flow if required

## 🔒 Security Best Practices

- **Never commit `.env.local`** - Keep API keys secret
- **Use environment variables** for sensitive data
- **Implement rate limiting** for API calls
- **Validate user input** before processing
- **Use HTTPS** in production

## 📈 Performance Optimization

- **Code splitting**: Next.js automatic code splitting
- **Image optimization**: Use Next.js Image component
- **Lazy loading**: Components load on demand
- **Memoization**: React.memo for expensive components
- **Debouncing**: Search and scroll optimization

## 🐛 Troubleshooting

### Common Issues

**Issue**: API calls failing

- **Solution**: Check API keys in `.env.local`
- **Fallback**: Application uses mock data without API keys

**Issue**: Dark mode not persisting

- **Solution**: Clear localStorage and redux-persist cache

```javascript
localStorage.clear();
```

**Issue**: Tests failing

- **Solution**: Ensure all dependencies are installed

```bash
npm install
npm test
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - [GitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [dnd-kit](https://dndkit.com/)
- [Lucide Icons](https://lucide.dev/)

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

## 🗺️ Roadmap

- [ ] Real-time updates with WebSockets
- [ ] User authentication with NextAuth.js
- [ ] Multi-language support with i18next
- [ ] PWA support for offline functionality
- [ ] Advanced filtering and sorting options
- [ ] Export favorites to PDF/CSV
- [ ] Social sharing features
- [ ] Content recommendations based on ML

---

Made with ❤️ using Next.js and TypeScript
