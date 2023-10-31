import { PopoverAuth } from '@/components/AuthPopover';
import UserPopover from '@/components/UserPopover';
import UploadedToast from '@/components/toast/Uploaded';
import Uploading from '@/components/toast/Uploading';
import { useUploadPhotoMutation } from '@/redux/features/photos/photosApi';
import { imageUpload } from '@/utils/Cloudinary';
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Button,
  Tooltip,
} from '@nextui-org/react';
import { Upload } from 'lucide-react';
import { useRef } from 'react';
import toast from 'react-hot-toast';

const Header = () => {
  const user = false;
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [upload, { data, error, isSuccess, isError }] =
    useUploadPhotoMutation();

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      toast.custom((t) => <Uploading item={t} selectedFile={selectedFile} />, {
        position: 'bottom-left',
        duration: 30000,
        id: selectedFile.name,
      });
      try {
        const imageUrl = await imageUpload(selectedFile);
        const { secure_url, original_filename } = imageUrl;
        const body = {
          name: original_filename,
          url: secure_url,
        };
        await upload(body);
        toast.dismiss(selectedFile.name);
        toast.custom(
          (t) => <UploadedToast item={t} selectedFile={selectedFile} />,
          {
            position: 'bottom-left',
            duration: 2000,
          }
        );

        console.log(body);
        if (isSuccess) {
          console.log(data);
        }
        if (isError) {
          console.log(error);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <Navbar shouldHideOnScroll isBordered maxWidth="full">
      <NavbarContent justify="end">
        <NavbarItem>
          <Tooltip content="upload photos">
            <Button
              onClick={handleButtonClick}
              startContent={
                <Upload
                  size={16}
                  className={
                    'group-data-[hover=true]:translate-x-0.5 outline-none transition-transform '
                  }
                />
              }
              fullWidth
              variant="solid"
              className="  rounded-xl py-1 px-4 "
            >
              Upload
            </Button>
          </Tooltip>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </NavbarItem>
        <NavbarItem>
          {user ? <UserPopover user={user} /> : <PopoverAuth />}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
export default Header;
