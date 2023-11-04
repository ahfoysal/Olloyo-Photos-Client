import { addPhoto, removePhoto } from '@/redux/features/photos/photosSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { IPhotos } from '@/types/GlobalInterfaces';
import { Checkbox } from '@nextui-org/react';
import { CSSProperties, forwardRef, HTMLAttributes } from 'react';
import 'react-photo-view/dist/react-photo-view.css';
import MobileImageContainer from './MobileImageContainer';
import ImageContainer from './ImageContainer';

type Props = {
  item: IPhotos;
  isOpacityEnabled?: boolean;
  isDragging?: boolean;
  isDraggingOn?: boolean;
  active: number | 0;
  isFeatured?: boolean;
  setIsDraggingOn: React.Dispatch<React.SetStateAction<boolean>>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
} & HTMLAttributes<HTMLDivElement>;

const Grid = forwardRef<HTMLDivElement, Props>(
  (
    {
      item,
      isOpacityEnabled,
      setVisible,
      setIsDraggingOn,
      isDraggingOn,
      isFeatured,
      setIndex,
      active,
      isDragging,
      style,
      ...props
    },
    ref
  ) => {
    const styles: CSSProperties = {
      cursor: isDragging ? 'grabbing' : 'grab',
      lineHeight: '0.5',
      transform: isDragging ? 'scale(1.05)' : 'scale(1)',
      ...style,
    };

    const dispatch = useAppDispatch();
    const photos = useAppSelector((state) => state.photos.photos);
    const isExist = photos.find((photo) => photo.id === item.id);

    const handleCheckboxChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      if (event.target.checked) {
        dispatch(addPhoto(item));
      } else {
        dispatch(removePhoto(item));
      }
    };

    return (
      <div
        ref={ref}
        style={styles}
        {...props}
        className={`border border-divider rounded-lg  group relative    ${
          isFeatured ? 'col-span-2 row-span-2 ' : ''
        }
     ${isDragging ? ' z-50 opacity-50' : ''}
     `}
      >
        {!isOpacityEnabled && (
          <div>
            <MobileImageContainer
              isDragging={isDragging}
              isExist={isExist}
              item={item}
              isFeatured={isFeatured}
            />
            <ImageContainer
              isDragging={isDragging}
              isExist={isExist}
              isDraggingOn={isDraggingOn}
              setIsDraggingOn={setIsDraggingOn}
              item={item}
              isFeatured={isFeatured}
              setVisible={setVisible}
              setIndex={setIndex}
              active={active}
            />
          </div>
        )}

        <div
          className={`absolute top-3 left-3  ${
            isExist ? '' : 'hidden group-hover:block'
          }    `}
        >
          <Checkbox
            onChange={handleCheckboxChange}
            isSelected={isExist ? true : false}
            color="danger"
          />
        </div>
      </div>
    );
  }
);

export default Grid;
