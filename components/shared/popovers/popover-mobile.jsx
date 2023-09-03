import * as Dialog from '@radix-ui/react-dialog';
import { Edit } from 'lucide-react';
import EditLinkModal from '../modals/edit-link';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Drawer } from 'vaul';
import { ArchiveIcon } from 'lucide-react';
import CustomAlert from '../alerts/custom-alert';
import { Trash } from 'lucide-react';

const PopoverMobile = ({
  id,
  title,
  url,
  isArchived,
  archiveProps,
  deleteAlertProps,
  closeDrawer,
}) => {
  return (
    <>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 backdrop-blur-sm" />
        <Drawer.Content className="bg-white p-2 flex flex-col rounded-t-xl h-[33%] mt-24 fixed bottom-0 left-0 right-0">
          <div className="mx-auto mt-6 w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-4" />
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="group flex w-full items-center gap-4 rounded-md p-3 text-sm font-medium text-gray-500 transition-all duration-75 hover:bg-gray-100">
                <Edit size={20} color="gray" />
                <h3 className="text-lg">Edit</h3>
              </button>
            </Dialog.Trigger>
            <EditLinkModal
              close={closeDrawer}
              id={id}
              title={title}
              url={url}
            />
          </Dialog.Root>
          <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
              <button className="group flex w-full items-center gap-4 rounded-md p-3 text-sm font-medium text-gray-500 transition-all duration-75 hover:bg-gray-100">
                <ArchiveIcon size={20} color="gray" />
                <h3 className="text-lg">
                  {!isArchived ? 'Archive' : 'Unarchive'}
                </h3>
              </button>
            </AlertDialog.Trigger>
            <CustomAlert close={closeDrawer} {...archiveProps} />
          </AlertDialog.Root>
          <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
              <button className="group flex w-full items-center gap-4 rounded-md p-3 text-sm font-medium text-red-400 transition-all duration-75 hover:bg-red-500 hover:text-white">
                <Trash size={20} className="text-b-400 hover:text-white" />
                <h3 className="text-lg">Delete</h3>
              </button>
            </AlertDialog.Trigger>
            <CustomAlert close={closeDrawer} {...deleteAlertProps} />
          </AlertDialog.Root>
        </Drawer.Content>
      </Drawer.Portal>
    </>
  );
};

export default PopoverMobile;
