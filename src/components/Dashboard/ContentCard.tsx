import React from 'react';
import { Heart } from 'lucide-react';

export interface ContentItem {
  id: string;
  type: 'news' | 'recommendation' | 'post' | 'social'; // added 'social'
  title: string;
  description?: string;
  content?: string;
  image?: string;
  url?: string; // can be undefined
  category?: string;
  source?: string;
  publishedAt?: string;
  createdAt?: string;
}

interface ContentCardProps {
  item: ContentItem;
  onFavorite: (item: ContentItem) => void;
  isFavorite: boolean;
  isDraggable?: boolean;
}

const ContentCard: React.FC<ContentCardProps> = ({
  item,
  onFavorite,
  isFavorite,
  isDraggable = false,
}) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavorite(item);
  };

  const handleMainButtonClick = () => {
    if (item.url) {
      window.open(item.url, '_blank');
    }
  };

  const getButtonText = () => {
    switch (item.type) {
      case 'news':
        return 'Read Article';
      case 'recommendation':
        return 'Watch Now';
      case 'post':
      case 'social':
        return 'View Post';
      default:
        return 'View';
    }
  };

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all"
      data-testid="content-card"
    >
      {item.image && (
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-48 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      )}
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <span 
            className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            data-testid="content-type-badge"
          >
            {item.type}
          </span>
          <button
            onClick={handleFavoriteClick}
            className="transition-colors hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-300"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            data-testid="favorite-button"
          >
            <Heart
              size={20}
              className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-400'}
              data-testid="heart-icon"
            />
          </button>
        </div>

        <h3 
          className="font-bold text-lg mb-2 text-gray-900 dark:text-white line-clamp-2"
          data-testid="content-title"
        >
          {item.title}
        </h3>

        <p 
          className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3"
          data-testid="content-description"
        >
          {item.description || item.content || ''}
        </p>

        <div className="mb-3 text-xs text-gray-500 dark:text-gray-400">
          <span data-testid="content-source">{item.source || 'Unknown'}</span>
          <span className="mx-2">•</span>
          <span data-testid="content-category">{item.category || 'General'}</span>
        </div>

        <button
          onClick={handleMainButtonClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!item.url}
          data-testid="main-action-button"
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  );
};

export default ContentCard;
