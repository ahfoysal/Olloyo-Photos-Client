import {
  addPhoto,
  removePhoto,
  resetPhotos,
} from '@/redux/features/photos/photosSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { IPhotos } from '@/types/GlobalInterfaces';
import { Checkbox } from '@nextui-org/react';
import { CSSProperties, forwardRef, HTMLAttributes, useState } from 'react';
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from '../ui/context-menu';
import { Eye, Trash2 } from 'lucide-react';
import { PhotoSlider } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import {
  useDeletePhotosMutation,
  useFetchPhotosQuery,
} from '@/redux/features/photos/photosApi';
import toast from 'react-hot-toast';
type Props = {
  item: IPhotos;
  isOpacityEnabled?: boolean;
  isDragging?: boolean;
  active?: number | 0;
  isFeatured?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const Item = forwardRef<HTMLDivElement, Props>(
  (
    { item, isOpacityEnabled, isFeatured, active, isDragging, style, ...props },
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

    const [deletePhotos] = useDeletePhotosMutation();
    const handleDeletePhotos = async () => {
      console.log(item);
      await deletePhotos([item]);
      toast.promise(
        deletePhotos(item),
        {
          loading: 'Deleting....',
          success: 'Deleted',
          error: 'Error when deleting',
        },
        {
          style: {
            borderRadius: '4px',
            background: '#333',
            color: '#fff',
          },
          position: 'bottom-left',
          duration: 3000,
        }
      );
      dispatch(resetPhotos());
    };
    const [visible, setVisible] = useState(false);
    const [index, setIndex] = useState(active || 0);
    const { data: fetchedData } = useFetchPhotosQuery('');
    return (
      <ContextMenu>
        <ContextMenuTrigger
          ref={ref}
          style={styles}
          {...props}
          className={`border border-divider rounded-lg  group relative    ${
            isFeatured ? 'col-span-2 row-span-2 ' : ''
          }
         ${isDragging ? ' z-50 opacity-50' : ''}
         `}
        >
          {' '}
          {!isOpacityEnabled && (
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
        </ContextMenuTrigger>
        <ContextMenuContent className="w-52">
          <ContextMenuCheckboxItem
            checked={isExist ? true : false}
            onClick={() => {
              if (!isExist) {
                console.log('true');

                dispatch(addPhoto(item));
              } else {
                console.log('false');

                dispatch(removePhoto(item));
              }
            }}
          >
            Select
          </ContextMenuCheckboxItem>
          <ContextMenuItem inset onClick={() => setVisible(true)}>
            Preview
            <ContextMenuShortcut>
              <Eye />
            </ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset onClick={handleDeletePhotos}>
            Delete
            <ContextMenuShortcut>
              <Trash2 />
            </ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>

        <PhotoSlider
          images={fetchedData?.data?.map((item: IPhotos) => ({
            src: item.url,
            key: item.key,
          }))}
          visible={visible}
          onClose={() => setVisible(false)}
          index={index}
          onIndexChange={setIndex}
        />
      </ContextMenu>
    );
  }
);

export default Item;
