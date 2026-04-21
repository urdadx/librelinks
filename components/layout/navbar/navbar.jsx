import Link from 'next/link';
import * as Dialog from '@radix-ui/react-dialog';
import {
  Wand,
  Link2,
  BarChart,
  CircleDot,
  Settings2,
  GithubIcon,
} from 'lucide-react';
import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/router';
import UserAccountNavDesktop from '@/components/utils/usernavbutton-desktop';
import ShareButton from '@/components/utils/share-button';
import SiteHeader from './main-nav';
import ShareModal from '@/components/shared/modals/share-modal';
import React from 'react';

const items = [
  {
    title: 'Links',
    href: '/admin',
    icon: Link2,
  },

  {
    title: 'Customize',
    href: '/admin/customize',
    icon: CircleDot,
  },

  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart,
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings2,
  },
];

const Navbar = ({ showName = false, isHomePage = true }) => {
  const { data: session, isPending } = useSession();
  const isAuthenticated = Boolean(session?.user);
  const router = useRouter();
  const showShareActions = !isPending && (isAuthenticated || !isHomePage);

  const isActiveRoute = (href) => router.pathname === href;

  return (
    <>
      <header className=" z-40 top-0 w-[100vw] border-b border-b-slate-200 bg-white">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 items-center">
            <Wand color="black" size={30} />
            <div className="hidden sm:flex sm:items-center sm:space-x-6">
              {!showName ? (
                items.map((item) => (
                  <nav key={item.title} className="rounded-xl">
                    <Link href={item.href}>
                      <div
                        className={`p-2 flex space-x-2 items-center rounded-xl transition-colors ${
                          isActiveRoute(item.href)
                            ? 'bg-slate-100 text-slate-900'
                            : 'bg-transparent text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        <item.icon size={18} />
                        <span>{item.title}</span>
                      </div>
                    </Link>
                  </nav>
                ))
              ) : (
                <SiteHeader />
              )}
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex items-center gap-2">
             <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <ShareButton />
                  </Dialog.Trigger>
                  <ShareModal />
                </Dialog.Root>
              <Link
                href="https://github.com/urdadx/librelinks"
                target="_blank"
                className="flex bg-white items-center gap-2 border-2 border-slate-300 text-black rounded-lg py-2 px-2 lg:px-4 hover:bg-gray-100 hover:border-slate-300"
              >
                <GithubIcon size={17} />
                <h3 className="text-sm lg:flex md:hidden hidden">Star on Github</h3>
              </Link>
               
              <UserAccountNavDesktop />
            </div>
          </div>
        </div>
        {!isPending && (isAuthenticated || !isHomePage) ? (
          <div className="flex items-center justify-center border border-t-gray-200 lg:hidden md:hidden">
            <div className="flex items-center space-x-6 p-1">
              {items?.map((item) => (
                <React.Fragment key={item.title}>
                  <nav key={item.title} className="rounded-xl">
                    <Link href={item.href}>
                      <div
                        className={`p-2 flex flex-col items-center rounded-xl transition-colors ${
                          isActiveRoute(item.href)
                            ? 'bg-slate-100 text-slate-900'
                            : 'bg-transparent text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        <item.icon size={18} />
                        <span className="text-sm">{item.title}</span>
                      </div>
                    </Link>
                  </nav>
                </React.Fragment>
              ))}
            </div>
          </div>
        ) : (
          ''
        )}
      </header>
    </>
  );
};

export default Navbar;
