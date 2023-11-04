import { IPhotos } from '@/types/GlobalInterfaces';

interface Props {
  item: IPhotos;
  isFeatured?: boolean;
  isExist: IPhotos | undefined;

  isDragging: boolean | undefined;
}
const MobileImageContainer: React.FC<Props> = ({
  item,
  isFeatured,
  isExist,
  isDragging,
}) => {
  return (
    <img
      src={item.url}
      alt={`${item.url}`}
      className={`bg-secondary block md:hidden ${
        isFeatured
          ? 'lg:h-[500px] h-[330px] sm:h-[400px] w-full '
          : 'lg:h-[245px] h-[163px] sm:h-[205px]  w-full object-cover overflow-hidden rounded-lg '
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
  );
};

export default MobileImageContainer;
