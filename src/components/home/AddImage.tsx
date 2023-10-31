import { Card, CardContent } from '@/components/ui/card';
import { useUploadPhotoMutation } from '@/redux/features/photos/photosApi';
import { imageUpload } from '@/utils/Cloudinary';
import { Image } from 'lucide-react';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import UploadingToast from '../toast/Uploading';
import UploadedToast from '../toast/Uploaded';
const AddImage = () => {
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
      toast.custom(
        (t) => <UploadingToast item={t} selectedFile={selectedFile} />,
        {
          position: 'bottom-left',
          duration: 30000,
          id: selectedFile.name,
        }
      );

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
    <Card
      onClick={handleButtonClick}
      className="cursor-pointer border-divider border-dashed min-h-[245px]"
    >
      <CardContent className="flex justify-center items-center flex-col gap-4 h-full w-full">
        <Image />
        <p>Add Image</p>
      </CardContent>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </Card>
  );
};

export default AddImage;
