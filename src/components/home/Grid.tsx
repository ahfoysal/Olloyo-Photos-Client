import { addPhoto, removePhoto } from '@/redux/features/photos/photosSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { IPhotos } from '@/types/GlobalInterfaces';
import { Checkbox } from '@nextui-org/react';
import { CSSProperties, forwardRef, HTMLAttributes } from 'react';

type Props = {
  item: IPhotos;
  isOpacityEnabled?: boolean;
  isDragging?: boolean;
  isFeatured?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const Item = forwardRef<HTMLDivElement, Props>(
  (
    { item, isOpacityEnabled, isFeatured, isDragging, style, ...props },
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
            <img
              src={item.url}
              alt={`${item.url}`}
              className={`bg-secondary ${
                isFeatured
                  ? 'h-[500px] w-full '
                  : 'h-[245px] w-full object-cover overflow-hidden rounded-lg '
              }
              
          ${isExist ? 'active-card' : ' group-hover:brightness-50'}
              
              `}
              style={{
                borderRadius: '8px',
                boxShadow: isDragging
                  ? 'none'
                  : 'rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px',
                maxWidth: '100%',
                objectFit: 'cover',
              }}
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

export default Item;
