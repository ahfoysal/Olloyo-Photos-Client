import { useFetchPhotosQuery } from '@/redux/features/photos/photosApi';
import { IPhotos } from '@/types/GlobalInterfaces';
import { PhotoSlider } from 'react-photo-view';

interface Props {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  visible: boolean;
  index: number;
}
const PreviewPhotoContainer: React.FC<Props> = ({
  setVisible,
  setIndex,
  visible,
  index,
}) => {
  const { data } = useFetchPhotosQuery('');

  return (
    <PhotoSlider
      images={data?.data?.map((item: IPhotos) => ({
        src: item.url,
        key: item.key,
      }))}
      visible={visible}
      onClose={() => {
        setVisible(false);
      }}
      index={index}
      onIndexChange={setIndex}
    />
  );
};

export default PreviewPhotoContainer;
