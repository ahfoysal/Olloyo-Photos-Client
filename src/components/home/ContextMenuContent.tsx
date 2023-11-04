import { useAppDispatch } from '@/redux/hook';
import {
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
} from '../ui/context-menu';
import { saveAs } from 'file-saver';
import { Download, Eye, Trash2 } from 'lucide-react';

import {
  addPhoto,
  removePhoto,
  resetPhotos,
} from '@/redux/features/photos/photosSlice';
import { useDeletePhotosMutation } from '@/redux/features/photos/photosApi';
import toast from 'react-hot-toast';
import { IPhotos } from '@/types/GlobalInterfaces';

interface Props {
  isExist: IPhotos | undefined;
  item: IPhotos;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  active: number | 0;
}
const ContextMenuContentContainer: React.FC<Props> = ({
  isExist,
  item,
  setVisible,
  setIndex,
  active,
}) => {
  const dispatch = useAppDispatch();
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

  return (
    <ContextMenuContent className="w-52 md:block hidden" id="context-area">
      <ContextMenuCheckboxItem
        checked={isExist ? true : false}
        onClick={() => {
          if (!isExist) {
            dispatch(addPhoto(item));
          } else {
            console.log('false');

            dispatch(removePhoto(item));
          }
        }}
      >
        Select
      </ContextMenuCheckboxItem>

      <ContextMenuSeparator />
      <ContextMenuItem
        inset
        onClick={() => {
          setIndex(active | 0);
          setVisible(true);
        }}
      >
        Preview
        <ContextMenuShortcut>
          <Eye />
        </ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem inset onClick={() => saveAs(item.url, item.name)}>
        Download
        <ContextMenuShortcut>
          <Download />
        </ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem inset onClick={handleDeletePhotos}>
        Delete
        <ContextMenuShortcut>
          <Trash2 />
        </ContextMenuShortcut>
      </ContextMenuItem>
    </ContextMenuContent>
  );
};

export default ContextMenuContentContainer;
