import { UserAvatar } from './avatar';
import * as Popover from '@radix-ui/react-popover';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { User, LogOut, AlertCircle } from 'lucide-react';
import useMediaQuery from '@/hooks/use-media-query';
import { Drawer } from 'vaul';
import UserNavButtonMobile from './usernavbutton-mobile';

const UserAccountNavDesktop = () => {
  const session = useSession();
  const { data } = session;
  const router = useRouter();

  const { isMobile } = useMediaQuery();

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('You logged out');
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      router.push('/login');
    }
  };

  return (
    <>
      <Popover.Root>
        {isMobile ? (
          <Drawer.Root shouldScaleBackground>
            <Drawer.Trigger>
              <UserAvatar size={35} />
            </Drawer.Trigger>
            <UserNavButtonMobile data={data} logout={handleLogout} />
          </Drawer.Root>
        ) : (
          <Popover.Trigger className="">
            <UserAvatar size={35} />
          </Popover.Trigger>
        )}

        <Popover.Portal>
          <Popover.Content
            className="z-50 w-[130px] mr-2 items-center rounded-md border border-gray-200 bg-white drop-shadow-lg md:block lg:w-[150px]"
            sideOffset={4}
          >
            <Link
              href="/admin/settings"
              className="group flex w-full items-center gap-2 rounded-md p-3 text-sm font-medium text-gray-500 transition-all duration-75 hover:bg-gray-100"
            >
              <User size={17} color="gray" />
              <h4 className="w-full truncate">{data.user.name}</h4>
            </Link>
            <button
              onClick={handleLogout}
              className="group flex w-full items-center gap-2 rounded-md p-3 text-sm font-medium text-red-400 transition-all duration-75 hover:bg-red-500 hover:text-white"
            >
              <LogOut size={17} className="text-b-400 hover:text-white" />
              <h4>Sign out</h4>
            </button>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </>
  );
};

export default UserAccountNavDesktop;
