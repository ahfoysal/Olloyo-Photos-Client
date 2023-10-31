import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { authHelper } from '@/firebase/authHelper';
import { IUser, resetUser } from '@/redux/features/auth/authSlice';
import { useAppDispatch } from '@/redux/hook';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@nextui-org/button';
import { Separator } from './ui/separator';

import React from 'react';
interface UserPopoverProps {
  user: IUser;
}

const UserPopover: React.FC<UserPopoverProps> = ({ user }) => {
  const { logout } = authHelper();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    logout()
      .then(() => {
        dispatch(resetUser());
      })
      .catch((err) => {
        console.error(err);
        dispatch(resetUser());
      });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="end"
        sideOffset={6}
        alignOffset={0}
        className=" z-[1000] bg-[#26262ada] backdrop-blur-2xl text-white rounded-lg backdrop-contrast-125 backdrop-saturate-200 border-[#262626]"
      >
        <div className="flex flex-col items-center">
          <p className="text-lg ">{user.email}</p>
          <Separator className="my-4" />
          <Button
            fullWidth
            variant="light"
            className=" bg-[#27272A] rounded-xl py-1 px-4 text-white"
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default UserPopover;
