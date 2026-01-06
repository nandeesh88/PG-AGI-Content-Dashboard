import { Heart } from 'lucide-react';
import { ContentItem } from '@/types';

interface ContentCardProps {
  item: ContentItem;
  onFavorite: (item: ContentItem) => void;
  isFavorite: boolean;
  isDraggable?: boolean;
}

// 💡 Removed React.FC for a cleaner standard function component
const ContentCard = ({
  item,
  onFavorite,
  isFavorite,
  isDraggable = false,
}: ContentCardProps) => {
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavorite(item);
  };

  const handleMainButtonClick = () => {
    if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer'); // 💡 Added security for window.open
    }
  };

  const getButtonText = () => {
    switch (item.type) {
      case 'news': return 'Read Article';
      case 'recommendation': return 'Watch Now';
      case 'social':
      case 'post': return 'View Post';
      default: return 'View';
    }
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all ${
        isDraggable ? 'cursor-grab active:cursor-grabbing' : ''
      }`}
      data-testid="content-card"
    >
      {item.image ? (
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            // 💡 Better: Replace with a placeholder instead of just hiding
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/400x200?text=No+Image';
          }}
        />
      ) : (
        /* 💡 Fallback for cards without an image key at all */
        <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
           <span className="text-gray-400">No Image Available</span>
        </div>
      )}

      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <span
            className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 uppercase tracking-wider font-semibold"
            data-testid="content-type-badge"
          >
            {item.type}
          </span>
          <button
            onClick={handleFavoriteClick}
            className="transition-transform hover:scale-120 focus:outline-none focus:ring-2 focus:ring-red-300 rounded-full p-1"
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
          {/* 💡 Simplified logic using optional chaining */}
          {item.description || item.content || 'No description available.'}
        </p>

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