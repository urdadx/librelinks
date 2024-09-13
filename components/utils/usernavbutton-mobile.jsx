import { Drawer } from 'vaul';
import Link from 'next/link';
import { AlertCircle, User } from 'lucide-react';
import { LogOut } from 'lucide-react';

const UserNavButtonMobile = ({ data, logout }) => {
  return (
    <>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 backdrop-blur-sm" />
        <Drawer.Content className="bg-white p-4 flex flex-col rounded-t-xl h-[33%] mt-24 fixed bottom-0 left-0 right-0">
          <div className="mx-auto mt-6 w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-4" />
          <Link
            href="/admin/settings"
            className="group flex w-full items-center gap-2 rounded-md p-3 text-sm font-medium text-gray-500 transition-all duration-75 hover:bg-gray-100"
          >
            <User size={17} color="gray" />
            <h3 className="w-full truncate text-lg">{data.user.name}</h3>
          </Link>
          <button
            onClick={logout}
            className="group flex w-full items-center gap-2 rounded-md p-3 text-sm font-medium text-red-400 transition-all duration-75 hover:bg-red-500 hover:text-white"
          >
            <LogOut size={17} className="text-b-400 hover:text-white" />
            <h3 className="text-lg">Sign out</h3>
          </button>
        </Drawer.Content>
      </Drawer.Portal>
    </>
  );
};

export default UserNavButtonMobile;
