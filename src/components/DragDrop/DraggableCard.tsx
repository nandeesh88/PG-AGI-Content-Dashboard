import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import ContentCard from '../Dashboard/ContentCard';
import { ContentItem } from '@/types';
import { GripVertical } from 'lucide-react';

interface SortableItemProps {
  item: ContentItem;
  onFavorite: (item: ContentItem) => void;
  isFavorite: boolean;
}

const SortableItem: React.FC<SortableItemProps> = ({ item, onFavorite, isFavorite }) => {
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
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 z-10 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
      >
        <GripVertical size={20} className="text-gray-600 dark:text-gray-400" />
      </div>

      <ContentCard item={item} onFavorite={onFavorite} isFavorite={isFavorite} isDraggable />
    </div>
  );
};

interface DraggableGridProps {
  items: ContentItem[];
  onReorder: (items: ContentItem[]) => void;
  onFavorite: (item: ContentItem) => void;
  favorites: ContentItem[];
}

const DraggableGrid: React.FC<DraggableGridProps> = ({
  items,
  onReorder,
  onFavorite,
  favorites,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      onReorder(newItems);
    }
  };

  const isFavorite = (item: ContentItem) => {
    return favorites.some((fav) => fav.id === item.id);
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((item) => item.id)} strategy={rectSortingStrategy}>
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((item) => (
            <SortableItem
              key={item.id}
              item={item}
              onFavorite={onFavorite}
              isFavorite={isFavorite(item)}
            />
          ))}
        </motion.div>
      </SortableContext>
    </DndContext>
  );
};

export default DraggableGrid;