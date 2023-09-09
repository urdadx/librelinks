import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import closeSVG from '@/public/close_button.svg';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { isValidUrl, signalIframe } from '@/utils/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useCurrentUser from '@/hooks/useCurrentUser';

const EditLinkModal = ({ id, title, url, close }) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newUrl, setNewUrl] = useState(url);

  const [urlError, setUrlError] = useState(false);

  const { data: currentUser } = useCurrentUser();
  const queryClient = useQueryClient();
  const userId = currentUser?.id ?? null;

  const editMutation = useMutation(
    async ({ newTitle, newUrl }) => {
      await axios.patch(`/api/links/${id}`, {
        newTitle,
        newUrl,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['links', userId] });
        signalIframe();
      },
    }
  );

  const handleEditLink = async () => {
    if (newTitle.trim() === '' || newUrl.trim() === '') {
      close();
      toast.error('Please fill the form');
      return;
    }
    close(); // close drawer
    await toast.promise(editMutation.mutateAsync({ newTitle, newUrl }), {
      loading: 'Editing link',
      success: 'Link edited successfully',
      error: 'An error occured',
    });
  };

  const handleUrlChange = (event) => {
    const urlValue = event.target.value;
    const URL = isValidUrl(urlValue);

    setNewUrl(urlValue);
    setUrlError(!URL);
  };

  return (
    <>
      <div>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 backdrop-blur-sm bg-gray-800 bg-opacity-50 sm:w-full" />
          <Dialog.Content
            className=" contentShow fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                		rounded-2xl bg-white p-6 sm:p-8 lg:max-w-3xl w-[350px] sm:w-[500px] shadow-lg 
               			md:max-w-lg max-md:max-w-lg focus:outline-none"
          >
            <div className="flex flex-row justify-between items-center mb-4">
              <Dialog.Title className="text-xl text-center font-medium mb-2 sm:mb-0 sm:mr-4">
                Edit Link
              </Dialog.Title>
              <Dialog.Close className="flex flex-end justify-end">
                <div
                  onClick={close}
                  className="p-2 rounded-full flex justify-center items-center bg-gray-100 hover:bg-gray-300"
                >
                  <Image priority src={closeSVG} alt="close" />
                </div>
              </Dialog.Close>
            </div>
            <form name="edit-link-form" className="mb-6">
              <div className="relative mb-4">
                <input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="block w-full h-10 px-4 py-6 mb-2 leading-tight text-gray-700 border rounded-2xl appearance-none focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Title"
                />
              </div>
              <div className="relative">
                <input
                  value={newUrl}
                  onChange={handleUrlChange}
                  className="block w-full h-10 px-4 py-6 mb-2 leading-tight text-gray-700 border rounded-2xl appearance-none focus:outline-none focus:shadow-outline"
                  id="name"
                  type="url"
                  placeholder="URL"
                />
                {urlError && (
                  <small className="text-red-500 text-sm">
                    Enter a valid url
                  </small>
                )}
              </div>

              <Dialog.Close asChild>
                <button
                  onClick={handleEditLink}
                  className="inline-block w-full px-4 py-4 leading-none 
                        			text-lg mt-2 text-white bg-slate-800 hover:bg-slate-900 rounded-3xl 
                        			focus:outline-none focus:shadow-outline-blue"
                >
                  Edit link{' '}
                  <span role="img" aria-label="sparkling star">
                    ✨
                  </span>
                </button>
              </Dialog.Close>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </div>
    </>
  );
};

export default EditLinkModal;
