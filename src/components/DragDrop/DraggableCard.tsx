// src/components/DragDrop/DraggableCard.tsx
import React from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import ContentCard from '../Dashboard/ContentCard';
import { ContentItem } from '@/types'; // or relative path

interface DraggableCardProps {
  item: ContentItem;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  onFavorite: (item: ContentItem) => void;
  isFavorite: boolean;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const DraggableCard: React.FC<DraggableCardProps> = ({
  item,
  index,
  moveCard,
  onFavorite,
  isFavorite,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: any }>({
    accept: 'card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(draggedItem: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) return;
      const dragIndex = draggedItem.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveCard(dragIndex, hoverIndex);
      draggedItem.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: { id: item.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      data-handler-id={handlerId}
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
