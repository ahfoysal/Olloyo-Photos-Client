import Grid from '@/components/home/Grid';
import { useFetchPhotosQuery } from '@/redux/features/photos/photosApi';
import { IPhotos } from '@/types/GlobalInterfaces';
import {
  DndContext,
  closestCenter,
  useSensors,
  TouchSensor,
  PointerSensor,
  useSensor,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import SortableItem from '@/components/home/SortableItem';
import AddImage from '@/components/home/AddImage';
import PhotoSkeleton from '@/components/home/Skeleton';
import PreviewPhotoContainer from '@/components/home/PreviewPhotoContainer';

export default function Home() {
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  const [photos, setPhotos] = useState<IPhotos[]>([]);
  const [activeItem, setActiveItem] = useState<IPhotos>();
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [isDraggingOn, setIsDraggingOn] = useState(false);

  const {
    data,

    isError,
    isSuccess,
    isLoading,
    error,
  } = useFetchPhotosQuery('');

  if (isError) {
    console.log(error);
  }
  useEffect(() => {
    if (isSuccess) {
      setPhotos(data.data);
    }
  }, [isSuccess, data]);
  if (isLoading) {
    return <PhotoSkeleton />;
  }
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    setActiveItem(photos.find((item: IPhotos) => item.id === active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeItem = photos.find((item: IPhotos) => item.id === active.id);
    const overItem = photos.find((item: IPhotos) => item.id === over.id);

    if (!activeItem || !overItem) {
      return;
    }

    const activeIndex = photos.findIndex(
      (item: IPhotos) => item.id === active.id
    );
    const overIndex = photos.findIndex((item: IPhotos) => item.id === over.id);

    if (activeIndex !== overIndex) {
      setPhotos((prev) => arrayMove<IPhotos>(prev, activeIndex, overIndex));
    }
    setActiveItem(undefined);
  };

  const handleDragCancel = () => {
    setActiveItem(undefined);
  };

  return (
    <div className="max-w-7xl w-[95%] mx-auto">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={photos} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-2">
            {photos.map((item, index) => (
              <SortableItem
                key={item.id}
                isFeatured={index === 0}
                item={item}
                index={index}
                setVisible={setVisible}
                setIndex={setIndex}
                setIsDraggingOn={setIsDraggingOn}
                isDraggingOn={isDraggingOn}
              />
            ))}
            <AddImage />
          </div>
        </SortableContext>
        <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
          {activeItem ? (
            <Grid
              item={activeItem}
              isFeatured={false}
              isDragging
              setVisible={setVisible}
              setIndex={setIndex}
              setIsDraggingOn={setIsDraggingOn}
              active={0}
              isDraggingOn={isDraggingOn}
            />
          ) : null}
        </DragOverlay>
        <PreviewPhotoContainer
          index={index}
          setVisible={setVisible}
          visible={visible}
          setIndex={setIndex}
        />
      </DndContext>
    </div>
  );
}
