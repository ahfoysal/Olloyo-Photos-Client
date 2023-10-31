import { useRef } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@nextui-org/button';
import { Trash2 } from 'lucide-react';

type DeletePopoverProps = {
  handleDeletePhotos: () => void; // Function type with no parameters and void return type
};

export function DeletePopover({ handleDeletePhotos }: DeletePopoverProps) {
  const trashButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleCancelClick = () => {
    if (trashButtonRef.current) {
      trashButtonRef.current.click();
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="flat" ref={trashButtonRef}>
          <Trash2 className="text-red-700" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="end"
        sideOffset={5}
        alignOffset={0}
        className="z-[1000] bg-secondary max-w-sm p-4  backdrop-blur-2xl rounded-lg backdrop-contrast-125 backdrop-saturate-200  shadow-xl"
      >
        <h1 className="text-base">Are you sure you want to delete?</h1>
        <div className="mt-4 flex justify-end w-full gap-2">
          <Button variant="flat" onClick={handleCancelClick}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleDeletePhotos}>
            Delete
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
