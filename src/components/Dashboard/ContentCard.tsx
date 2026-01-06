// src/components/Dashboard/ContentCard.tsx
import React from 'react';
import { Heart } from 'lucide-react';
import { ContentItem } from '@/types'; // ✅ Use the shared type

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
    if ('url' in item && item.url) {
      window.open(item.url, '_blank');
    }
  };

  const getButtonText = () => {
    switch (item.type) {
      case 'news':
        return 'Read Article';
      case 'recommendation':
        return 'Watch Now';
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
          onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
        />
      )}

      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {item.type}
          </span>
          <button
            onClick={handleFavoriteClick}
            className="transition-colors hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-300"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              size={20}
              className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-400'}
            />
          </button>
        </div>

        <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white line-clamp-2">
          {item.title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {'content' in item ? item.content || item.description || '' : item.description || ''}
        </p>

        {/* News-specific info */}
        {item.type === 'news' && (
          <div className="mb-3 text-xs text-gray-500 dark:text-gray-400">
            <span>{item.source}</span>
            <span className="mx-2">•</span>
            <span>{item.category}</span>
            <span className="mx-2">•</span>
            <span>{item.publishedAt}</span>
          </div>
        )}

        {/* Recommendation-specific info */}
        {item.type === 'recommendation' && (
          <div className="mb-3 text-xs text-gray-500 dark:text-gray-400">
            <span>Genre: {item.genre}</span>
            <span className="mx-2">•</span>
            <span>Rating: {item.rating}</span>
            {item.releaseDate && (
              <>
                <span className="mx-2">•</span>
                <span>Release: {item.releaseDate}</span>
              </>
            )}
          </div>
        )}

        {/* SocialPost-specific info */}
        {item.type === 'social' && (
          <div className="mb-3 text-xs text-gray-500 dark:text-gray-400">
            <span>@{item.username}</span>
            <span className="mx-2">•</span>
            <span>Likes: {item.likes}</span>
            {item.comments && (
              <>
                <span className="mx-2">•</span>
                <span>Comments: {item.comments}</span>
              </>
            )}
          </div>
        )}

        <button
          onClick={handleMainButtonClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!('url' in item && item.url)}
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  );
};

export default ContentCard;
