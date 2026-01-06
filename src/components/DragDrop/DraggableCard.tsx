// src/components/DragDrop/DraggableCard.tsx
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ContentCard from '../Dashboard/ContentCard';
import { ContentItem } from '@/types'; // or relative path

interface DraggableCardProps {
  item: ContentItem;
  index: number;
  onFavorite: (item: ContentItem) => void;
  isFavorite: boolean;
}

const DraggableCard: React.FC<DraggableCardProps> = ({
  item,
  index,
  onFavorite,
  isFavorite,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <ContentCard
        item={item} // ✅ Pass the unified ContentItem type
        onFavorite={onFavorite}
        isFavorite={isFavorite}
        isDraggable
      />
    </div>
  );
};

export default DraggableCard;
