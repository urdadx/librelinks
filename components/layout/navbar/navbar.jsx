import Link from 'next/link';
import * as Dialog from '@radix-ui/react-dialog';
import { Wand, Link2, BarChart, CircleDot, Settings2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import UserAccountNavDesktop from '@/components/utils/usernavbutton-desktop';
import ShareButton from '@/components/utils/share-button';
import SiteHeader from './main-nav';
import ShareModal from '@/components/shared/modals/share-modal';
import React from 'react';

const items = [
  {
    title: 'Links',
    href: '/admin',
    icon: <Link2 color="black" size={18} />,
  },

  {
    title: 'Customize',
    href: '/admin/customize',
    icon: <CircleDot size={18} />,
  },

  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: <BarChart color="black" size={18} />,
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: <Settings2 color="black" size={18} />,
  },
];

const Navbar = ({ showName = false, isHomePage = true }) => {
  const session = useSession();

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
                      <div className="bg-transparent p-2 flex space-x-2 items-center hover:bg-slate-100 rounded-xl">
                        {item.icon}
                        <span className="">{item.title}</span>
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
            {session.status === 'authenticated' && (
              <div className="flex items-center gap-2">
                <Dialog.Root>
                  <Dialog.Trigger>
                    <ShareButton />
                  </Dialog.Trigger>
                  <ShareModal />
                </Dialog.Root>
                <UserAccountNavDesktop />
              </div>
            )}
          </div>
        </div>
        {!session.status === 'authenticated' || !isHomePage ? (
          <div className="flex items-center justify-center border border-t-gray-200 lg:hidden md:hidden">
            <div className="flex items-center space-x-6 p-1">
              {items?.map((item) => (
                <React.Fragment key={item.title}>
                  <nav key={item.title} className="rounded-xl">
                    <Link href={item.href}>
                      <div className="bg-transparent p-2 flex flex-col items-center hover:bg-slate-100 rounded-xl">
                        {item.icon}
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
