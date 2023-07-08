import React, { useCallback, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import ThreeDots from './three-dots';
import { Edit, Trash, Eye, EyeOff } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import EditLinkModal from '../shared/modals/edit-link';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const InfoPopover = ({ id, title, url, archived }) => {

    const [isArchived, setIsArchived] = useState(archived);    
    const handleToggleVisiblity = useCallback(async () => {
        await toast.promise(
            axios.patch(`/api/links/${id}`, { archived: !isArchived }),
            {
              loading: "Applying changes",
              success: "Changes applied",
              error: "An error occured"
            }
        )   
        setIsArchived(!isArchived)   
    }, [isArchived])


    const handleDeleteLink = useCallback(async () => {
        await toast.promise(
            axios.delete(`/api/links/${id}`),
            {
              loading: "Deleting link",
              success: "Link deleted successfully",
              error: "An error occured"
            }
        )        
    },[id])


  return (
    <Popover.Root>
      <Popover.Trigger className="">
        <ThreeDots className="h-5 w-5 text-gray-500 absolute top-1/2 left-[97%] -translate-x-1/2 -translate-y-1/2"  />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="w-[120px] items-center rounded-md border border-gray-200 mr-2 bg-white drop-shadow-lg md:block lg:w-[150px]"
          sideOffset={4}
        >
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="group flex w-full items-center justify-between rounded-md p-3 text-sm font-medium text-gray-500 transition-all duration-75 hover:bg-gray-100">
              <h4>Edit</h4>
              <Edit size={17} color="gray" />
            </button>
          </Dialog.Trigger>
          <EditLinkModal id={id} title={title} url={url} />
        </Dialog.Root>
          <button
            onClick={handleToggleVisiblity}
            className="group flex w-full items-center justify-between rounded-md p-3 text-sm font-medium text-gray-500 transition-all duration-75 hover:bg-gray-100"
          >
            <h4>Visibility</h4>
            {!isArchived ? <Eye size={17} color="gray" /> : <EyeOff size={17} color="gray" />}
          </button>
          <button onClick={handleDeleteLink} className="group flex w-full items-center justify-between rounded-md p-3 text-sm font-medium text-red-400 transition-all duration-75 hover:bg-red-500 hover:text-white">
            <h4>Delete</h4>
            <Trash size={17} className="text-b-400 hover:text-white" />
          </button>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default InfoPopover;
