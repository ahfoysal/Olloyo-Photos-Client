import { tv } from 'tailwind-variants';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Spinner } from '@nextui-org/spinner';
import { Tooltip } from '@nextui-org/tooltip';
import { Button } from '@nextui-org/button';
import { useHover } from '@react-aria/interactions';
import { NavLink } from 'react-router-dom';
import Menu from '@/assets/icons/MenuIcon';
import Home from '@/assets/icons/HomeIcon';
import Search from '@/assets/icons/SearchIcon';
import Discover from '@/assets/icons/DiscoverIcon';
import { UseSettings } from '@/hooks/useLocalStorage';

export function NavigationBrowse() {
  const { sidebarMiniMode, sidebarHoverMode, sidebarBoxedMode } = UseSettings();
  const { hoverProps: sidebarHoverProps, isHovered } = useHover({
    isDisabled: !sidebarHoverMode.value,
  });
  const navigationItemWidthStyle =
    sidebarMiniMode.value && !isHovered ? 'w-[56px]' : 'w-[160px]';

  return (
    <aside
      {...sidebarHoverProps}
      className={sidebarStyles({
        sidebarMiniMode: sidebarMiniMode.value,
        sidebarBoxedMode: sidebarBoxedMode.value,
        sidebarHoverMode: isHovered,
      })}
    >
      <div className="mb-3 ml-0 flex h-[65px] w-full flex-row items-center justify-start">
        <Button
          className={`${
            sidebarMiniMode.value && !isHovered
              ? 'basis-[50px]'
              : 'basis-[60px]'
          } ml-4 flex shrink-0 grow-0 justify-center`}
          isIconOnly
          variant="light"
          onPress={() => {
            sidebarMiniMode.set(!sidebarMiniMode.value);
          }}
        >
          <Menu />
        </Button>

        <div className="flex items-center gap-x-3">
          <NavLink
            to="/"
            arial-label="home-page"
            className="flex gap-2 bg-gradient-to-tr from-secondary to-primary to-50% bg-clip-text text-xl 
              font-medium  "
          >
            <img className="h-8 w-8" src="/logo.svg" alt="" />
            <p>Photos</p>
          </NavLink>
        </div>
      </div>
      <NavigationMenu
        orientation="vertical"
        // viewportPositionClassName
        viewportPositionClassName={viewportPositionStyles({
          sidebarMiniMode: sidebarMiniMode.value,
          sidebarHoverMode: sidebarHoverMode.value,
          sidebarBoxedMode: sidebarBoxedMode.value,
        })}
      >
        <NavigationMenuList className="m-0 gap-3 [&_.active]:bg-default [&_.active]:text-default-foreground">
          <NavigationMenuItem
            className={`${navigationItemWidthStyle} text-left transition-[width] duration-200`}
            value="home"
          >
            <Tooltip
              isDisabled={
                !sidebarMiniMode.value || (sidebarHoverMode && isHovered)
              }
              placement="right"
              offset={10}
              showArrow
            >
              <NavigationMenuLink asChild>
                <NavLink
                  to="/"
                  className={navigationMenuTriggerStyle({
                    class: `${navigationItemWidthStyle} h-[56px] justify-start transition-[width] duration-200`,
                  })}
                >
                  {({ isActive, isPending }) => (
                    <>
                      <Home
                        className={
                          !sidebarMiniMode.value ||
                          (sidebarHoverMode && isHovered)
                            ? 'mr-4'
                            : ''
                        }
                        filled={isActive}
                      />
                      {!sidebarMiniMode.value || (sidebarHoverMode && isHovered)
                        ? 'Home'
                        : null}
                      <Spinner
                        size="sm"
                        classNames={{
                          base:
                            isPending &&
                            (!sidebarMiniMode.value ||
                              (sidebarHoverMode && isHovered))
                              ? 'ml-auto'
                              : '!hidden',
                          circle1: 'border-b-default-foreground',
                          circle2: 'border-b-default-foreground',
                        }}
                      />
                    </>
                  )}
                </NavLink>
              </NavigationMenuLink>
            </Tooltip>
          </NavigationMenuItem>

          <NavigationMenuItem
            className={`${navigationItemWidthStyle} text-left transition-[width] duration-200`}
            value="Explore"
          >
            <Tooltip
              content={'Explore'}
              isDisabled={
                !sidebarMiniMode.value || (sidebarHoverMode && isHovered)
              }
              placement="right"
              showArrow
              offset={10}
            >
              <NavigationMenuLink asChild>
                <NavLink
                  to="/explore"
                  className={navigationMenuTriggerStyle({
                    class: `${navigationItemWidthStyle} h-[56px] justify-start transition-[width] duration-200`,
                  })}
                >
                  {({ isActive, isPending }) => (
                    <>
                      <Discover
                        className={
                          !sidebarMiniMode.value ||
                          (sidebarHoverMode && isHovered)
                            ? 'mr-4'
                            : ''
                        }
                        filled={isActive}
                      />
                      {!sidebarMiniMode.value || (sidebarHoverMode && isHovered)
                        ? 'Explore'
                        : null}
                      <Spinner
                        size="sm"
                        classNames={{
                          base:
                            isPending &&
                            (!sidebarMiniMode.value ||
                              (sidebarHoverMode && isHovered))
                              ? 'ml-auto'
                              : '!hidden',
                          circle1: 'border-b-default-foreground',
                          circle2: 'border-b-default-foreground',
                        }}
                      />
                    </>
                  )}
                </NavLink>
              </NavigationMenuLink>
            </Tooltip>
          </NavigationMenuItem>
          <NavigationMenuItem
            className={`${navigationItemWidthStyle} text-left transition-[width] duration-200`}
            value="Search"
          >
            <Tooltip
              content={'Search'}
              isDisabled={
                !sidebarMiniMode.value || (sidebarHoverMode && isHovered)
              }
              placement="right"
              showArrow
              offset={10}
            >
              <NavigationMenuLink asChild>
                <NavLink
                  to="/search"
                  className={navigationMenuTriggerStyle({
                    class: `${navigationItemWidthStyle} h-[56px] justify-start transition-[width] duration-200`,
                  })}
                >
                  {({ isActive, isPending }) => (
                    <>
                      <Search
                        className={
                          !sidebarMiniMode.value ||
                          (sidebarHoverMode && isHovered)
                            ? 'mr-4'
                            : ''
                        }
                        filled={isActive}
                      />
                      {!sidebarMiniMode.value || (sidebarHoverMode && isHovered)
                        ? 'Search'
                        : null}
                      <Spinner
                        size="sm"
                        classNames={{
                          base:
                            isPending &&
                            (!sidebarMiniMode.value ||
                              (sidebarHoverMode && isHovered))
                              ? 'ml-auto'
                              : '!hidden',
                          circle1: 'border-b-default-foreground',
                          circle2: 'border-b-default-foreground',
                        }}
                      />
                    </>
                  )}
                </NavLink>
              </NavigationMenuLink>
            </Tooltip>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </aside>
  );
}

const sidebarStyles = tv({
  base: 'top-5 fixed z-5 box-border hidden shrink-0 grow-0 transition-[max-width] duration-400 sm:block',
  variants: {
    sidebarMiniMode: {
      true: 'w-full max-w-[80px] basis-[80px]',
      false: 'w-full max-w-[200px] basis-[200px]',
    },
    sidebarBoxedMode: {
      true: 'left-[15px] top-[15px] h-[calc(100vh_-_30px)] rounded-large border border-divider backdrop-blur-lg shadow-medium',
      false: 'left-0 top-0 h-screen',
    },
    sidebarHoverMode: {
      true: 'w-full max-w-[200px] basis-[200px] rounded-r-large border border-divider backdrop-blur-lg shadow-2xl',
    },
  },
  compoundVariants: [{}],
  defaultVariants: {
    sidebarMiniMode: false,
    sidebarBoxedMode: false,
  },
});

const viewportPositionStyles = tv({
  base: '!fixed',
  variants: {
    sidebarMiniMode: {
      true: '!left-[85px]',
    },
    sidebarHoverMode: {
      true: '!left-[200px]',
    },
    sidebarBoxedMode: {
      true: '!left-[265px]',
    },
  },
  compoundVariants: [
    {
      sidebarMiniMode: true,
      sidebarHoverMode: true,
      sidebarBoxedMode: false,
      class: '!left-[200px]',
    },
    {
      sidebarMiniMode: true,
      sidebarHoverMode: false,
      sidebarBoxedMode: true,
      class: '!left-[100px]',
    },
    {
      sidebarMiniMode: false,
      sidebarHoverMode: false,
      sidebarBoxedMode: false,
      class: '!left-[200px]',
    },
  ],
  defaultVariants: {
    sidebarMiniMode: false,
    sidebarHoverMode: false,
    sidebarBoxedMode: false,
  },
});
