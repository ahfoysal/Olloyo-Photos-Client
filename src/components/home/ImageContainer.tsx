import { IPhotos } from '@/types/GlobalInterfaces';
import { ContextMenu, ContextMenuTrigger } from '../ui/context-menu';
import ContextMenuContentContainer from './ContextMenuContent';

interface Props {
  item: IPhotos;
  isFeatured?: boolean;
  isExist: IPhotos | undefined;
  active: number | 0;
  isDragging: boolean | undefined;
  setIsDraggingOn: React.Dispatch<React.SetStateAction<boolean>>;
  isDraggingOn: boolean | undefined;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}
const ImageContainer: React.FC<Props> = ({
  item,
  isFeatured,
  isExist,
  isDragging,
  setIsDraggingOn,
  isDraggingOn,
  setVisible,
  setIndex,
  active,
}) => {
  return (
    <div className="hidden md:block">
      <ContextMenu onOpenChange={() => setIsDraggingOn(!isDraggingOn)}>
        <ContextMenuTrigger>
          <img
            src={item.url}
            alt={`${item.url}`}
            className={`bg-secondary ${
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
        </ContextMenuTrigger>

        <ContextMenuContentContainer
          isExist={isExist}
          setVisible={setVisible}
          setIndex={setIndex}
          active={active}
          item={item}
        />
      </ContextMenu>
    </div>
  );
};

export default ImageContainer;
