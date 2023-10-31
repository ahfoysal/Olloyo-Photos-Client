import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { HTMLAttributes } from 'react';
import Grid from './Grid';
import { IPhotos } from '@/types/GlobalInterfaces';

type Props = {
  item: IPhotos;
  isFeatured: boolean;
  index: number;
} & HTMLAttributes<HTMLDivElement>;

const SortableItem = ({ item, ...props }: Props) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    index,
    transition,
  } = useSortable({
    id: item.id,
  });

  const styles = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  };

  return (
    <Grid
      item={item}
      active={index}
      ref={setNodeRef}
      style={styles}
      isOpacityEnabled={isDragging}
      {...props}
      {...attributes}
      {...listeners}
    />
  );
};

export default SortableItem;
