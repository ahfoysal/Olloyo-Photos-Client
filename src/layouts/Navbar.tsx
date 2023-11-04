import { PopoverAuth } from '@/components/AuthPopover';
import UserPopover from '@/components/UserPopover';
import UploadedToast from '@/components/toast/Uploaded';
import Uploading from '@/components/toast/Uploading';
import { ModeToggle } from '@/components/ui/ModeToggle';
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
import { NavLink } from 'react-router-dom';

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
            id: selectedFile.size.toString(),
          }
        );

        console.log(body);
        if (isSuccess) {
          console.log(data);

          setTimeout(function () {
            toast.dismiss(selectedFile.size.toString());
          }, 5000);
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
    <Navbar isBordered maxWidth="full">
      <NavbarContent justify="start" className="sm:hidden">
        <NavLink
          to="/"
          arial-label="home-page"
          className="flex gap-2 bg-gradient-to-tr from-secondary to-primary to-50% bg-clip-text text-xl 
              font-medium  "
        >
          <img className="h-8 w-8" src="/logo.svg" alt="" />
          <p>Photos</p>
        </NavLink>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:block">
          <ModeToggle />
        </NavbarItem>
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
              className=" sm:flex hidden  rounded-xl py-1 px-4 "
            >
              Upload
            </Button>
          </Tooltip>
          <Button
            onClick={handleButtonClick}
            fullWidth
            isIconOnly
            variant="solid"
            className="flex  sm:hidden  rounded-xl  "
          >
            <Upload
              size={16}
              className={
                'group-data-[hover=true]:translate-x-0.5 outline-none transition-transform '
              }
            />
          </Button>
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
