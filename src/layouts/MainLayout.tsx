import { Outlet } from 'react-router-dom';
import { tv } from 'tailwind-variants';
import { UseSettings } from '@/hooks/useLocalStorage';
import SideBar from '@/components/Shared/SIdeBar';
import Navbar from './Navbar';
import { useAppSelector } from '@/redux/hook';
import ActionNav from './ActionNav';

export default function MainLayout() {
  const { sidebarMiniMode, sidebarBoxedMode } = UseSettings();
  const photos = useAppSelector((state) => state.photos.photos);

  return (
    <div>
      {photos.length > 0 ? <ActionNav photos={photos} /> : <Navbar />}
      <div className="   min-h-screen    flex max-h-full  max-w-full flex-nowrap justify-start bg-content1/[0.3] transition-[padding] duration-200 p-0">
        <SideBar />

        <div
          className={contentAreaStyles({
            mini: sidebarMiniMode.value,
            boxed: sidebarBoxedMode.value,
          })}
        >
          <div className="my-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
const contentAreaStyles = tv({
  base: ' ml-0  rounded-t-[10px] flex w-full grow flex-col   overflow-hidden  bg-background shadow-medium transition-[margin] duration-200 sm:border-divider ',
  variants: {
    mini: {
      true: 'sm:ml-[80px] sm:!rounded-tl-medium sm:border-l sm:border-t',
    },
    boxed: {
      true: 'sm:ml-[200px] sm:!rounded-medium ',
    },
    hideSidebar: {
      true: 'sm:ml-0',
    },
  },
  compoundVariants: [
    {
      mini: true,
      boxed: true,
      hideSidebar: false,
      class: 'sm:ml-[110px] sm:!rounded-medium ',
    },
    {
      mini: false,
      boxed: false,
      hideSidebar: false,
      class: 'sm:ml-[200px] sm:!rounded-tl-medium sm:border-l ',
    },
    {
      boxed: true,
      hideSidebar: true,
      class: 'sm:ml-[15px] sm:!rounded-medium ',
    },
  ],
  defaultVariants: {
    mini: false,
    boxed: false,
    hideSidebar: false,
  },
});
