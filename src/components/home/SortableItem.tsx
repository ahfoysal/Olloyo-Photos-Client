import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { HTMLAttributes } from 'react';
import Grid from './Grid';
import { IPhotos } from '@/types/GlobalInterfaces';

type Props = {
  item: IPhotos;
  isFeatured: boolean;
  index: number;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDraggingOn: React.Dispatch<React.SetStateAction<boolean>>;
  isDraggingOn: boolean;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
} & HTMLAttributes<HTMLDivElement>;

const SortableItem = ({
  item,
  setIsDraggingOn,
  isDraggingOn,
  setVisible,
  setIndex,
  ...props
}: Props) => {
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
    disabled: isDraggingOn,
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
      setVisible={setVisible}
      setIsDraggingOn={setIsDraggingOn}
      isDraggingOn={isDraggingOn}
      setIndex={setIndex}
      style={styles}
      isOpacityEnabled={isDragging}
      {...props}
      {...attributes}
      {...listeners}
    />
  );
};

export default SortableItem;
