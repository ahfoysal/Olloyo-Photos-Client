import {
  useDeletePhotosMutation,
  useFetchPhotosQuery,
} from '@/redux/features/photos/photosApi';
import {
  addPhoto,
  removePhoto,
  resetPhotos,
} from '@/redux/features/photos/photosSlice';
import { useAppDispatch } from '@/redux/hook';
import { IPhotos } from '@/types/GlobalInterfaces';
import { Button, Checkbox, Navbar, NavbarContent } from '@nextui-org/react';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DeletePopover } from '../DeletePopover';
import toast from 'react-hot-toast';

interface HomeNavProps {
  photos: IPhotos[];
}

const HomeNav: React.FC<HomeNavProps> = ({ photos }) => {
  const [allPhotos, setAllPhotos] = useState<IPhotos[]>([]);

  const dispatch = useAppDispatch();
  const handleResetPhotos = () => {
    dispatch(resetPhotos());
  };
  const [deletePhotos] = useDeletePhotosMutation();
  const handleDeletePhotos = async () => {
    console.log(photos);
    await deletePhotos(photos);
    toast.promise(
      deletePhotos(photos),
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
  const { data: fetchedData, isSuccess: isFetchSuccess } =
    useFetchPhotosQuery('');

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      dispatch(resetPhotos());
      dispatch(addPhoto(allPhotos));
    } else {
      dispatch(removePhoto(allPhotos));
    }
  };
  useEffect(() => {
    if (isFetchSuccess) {
      setAllPhotos(fetchedData.data);
    }
  }, [isFetchSuccess, allPhotos, fetchedData]);

  return (
    <Navbar isBordered maxWidth="full" className="z-[55]">
      <NavbarContent justify="start">
        <Button variant="flat" size="sm" onClick={handleResetPhotos}>
          <X />
        </Button>
        <p>{photos.length} Selected</p>

        <div className="flex ga-1">
          <Checkbox
            onChange={handleCheckboxChange}
            defaultSelected={false}
            color="primary"
          />
          <p> Select All</p>
        </div>
      </NavbarContent>
      <NavbarContent justify="end">
        <DeletePopover handleDeletePhotos={handleDeletePhotos} />
      </NavbarContent>
    </Navbar>
  );
};

export default HomeNav;
