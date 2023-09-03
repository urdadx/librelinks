import { Plus } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import AddLinkModal from '../../shared/modals/add-new-link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from './link';
import useCurrentUser from '@/hooks/useCurrentUser';
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import useLinks from '@/hooks/useLinks';
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { signalIframe } from '@/utils/helpers';
import toast from 'react-hot-toast';
import LinkSkeleton from './link-skeleton';

const LinksEditor = () => {
  const { data: currentUser } = useCurrentUser();
  const userId = currentUser?.id ? currentUser.id : null;

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  const { data: userLinks, isLoading } = useLinks(userId);
  const queryClient = useQueryClient();

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const activeIndex = userLinks.findIndex((link) => link.id === active.id);
      const overIndex = userLinks.findIndex((link) => link.id === over.id);
      const newLinks = arrayMove(userLinks, activeIndex, overIndex);

      queryClient.setQueryData(['links', currentUser?.id], () => newLinks);
      await toast.promise(updateLinksOrderMutation.mutateAsync(newLinks), {
        loading: 'Syncing changes',
        success: 'Changes synced',
        error: 'An error occured',
      });
    }
  };

  const updateLinksOrderMutation = useMutation(
    async (newLinks) => {
      await axios.put(`/api/links`, {
        links: newLinks,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['links', currentUser?.id]);
        signalIframe();
      },
    }
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <div className="max-w-[640px] mx-auto my-10">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <div className="">
              <button
                className="bg-slate-900 w-full font-medium flex justify-center gap-1 
                				items-center h-12 px-8 rounded-3xl text-white hover:bg-slate-700"
              >
                <Plus /> Add link
              </button>
            </div>
          </Dialog.Trigger>
          <AddLinkModal />
        </Dialog.Root>

        <div className="my-10">
          {!isLoading
            ? userLinks?.map(({ id, ...userLink }) => (
                <React.Fragment key={id}>
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <SortableContext
                      items={userLinks && userLinks}
                      strategy={verticalListSortingStrategy}
                    >
                      <Link key={id} id={id} {...userLink} />
                    </SortableContext>
                  </motion.div>
                </React.Fragment>
              ))
            : Array.from({ length: 4 }).map((_, i) => <LinkSkeleton key={i} />)}
          {!isLoading && userLinks?.length === 0 && (
            <div className="mt-4 w-[245px] h-auto flex flex-col mx-auto">
              <Image
                className="object-cover"
                width="220"
                height="220"
                alt="not-found"
                src="/assets/not-found.png"
              />
              <h3 className="font-bold text-lg mt-3 text-[#222]">
                You don&apos;t have any links yet
              </h3>
              <p className="text-sm text-[#555] text-center px-3">
                Please click on the button above to add your first link 🚀
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="h-[40px] mb-12" />
    </DndContext>
  );
};

export default LinksEditor;
