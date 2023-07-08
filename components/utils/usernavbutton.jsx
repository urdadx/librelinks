import { UserAvatar } from "./avatar";
import * as Popover from "@radix-ui/react-popover";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { User, LogOut, HomeIcon } from "lucide-react";

const UserAccountNav = () => {
  const session = useSession();
  const { data } = session;
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("You logged out");
    } catch (error) {
      toast.error("An error occurred");
    } finally{
        router.push("/login")
    }
  };

  return (
    <>
      <Popover.Root>
        <Popover.Trigger className="">
          <UserAvatar />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            className="w-[130px] mr-2 items-center rounded-md border border-gray-200 bg-white drop-shadow-lg md:block lg:w-[150px]"
            sideOffset={4}
          >
            <Link
              href="/settings"
              className="group flex w-full items-center gap-2 rounded-md p-3 text-sm font-medium text-gray-500 transition-all duration-75 hover:bg-gray-100"
            >
              <User size={17} color="gray" />
              <h4 className="w-full truncate">{data.user.name}</h4>
            </Link>
            <Link
              href="/admin"
              className="group flex w-full items-center gap-2 rounded-md p-3 text-sm font-medium text-gray-500 transition-all duration-75 hover:bg-gray-100"
            >
              <HomeIcon size={17} color="gray" />
              <h4>Dashboard</h4>
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

export default UserAccountNav;
