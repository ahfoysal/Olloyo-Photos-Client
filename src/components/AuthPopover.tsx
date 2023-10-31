import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import LoginPage from '@/pages/Login';
import SignupPage from '@/pages/Signup';
import { Button } from '@nextui-org/button';
import { useState } from 'react';
import { Separator } from './ui/separator';
import GoogleButton from 'react-google-button';

export function PopoverAuth() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button fullWidth variant="solid" className="  rounded-xl py-1 px-4 ">
          LOGIN
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="end"
        sideOffset={5}
        alignOffset={0}
        className="z-[1000] bg-[#18181bb9] backdrop-blur-2xl rounded-lg backdrop-contrast-125 backdrop-saturate-200 border-[#262626]"
      >
        {isLogin ? (
          <LoginPage setIsLogin={setIsLogin} />
        ) : (
          <SignupPage setIsLogin={setIsLogin} />
        )}
        <div className="flex items-center">
          <Separator className="flex-1 my-4" />
          <span className="mx-2 text-white text-sm"> or</span>
          <Separator className="flex-1 my-4" />
        </div>
        <GoogleButton
          type="dark"
          onClick={() => {
            console.log('Google button clicked');
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
