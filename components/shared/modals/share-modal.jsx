import { siteConfig } from '@/config/site';
import closeSVG from '@/public/close_button.svg';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import Image from 'next/image';
import { QRCodeCanvas } from 'qrcode.react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useCurrentUser from '@/hooks/useCurrentUser';

const ShareModal = () => {
  const { data: currentUser } = useCurrentUser();
  const userProfileLink =
    process.env.NODE_ENV === 'development'
      ? `http://localhost:3000/${currentUser?.handle}`
      : `https://librelinks.vercel.app/${currentUser?.handle}`;

  const [isCopied, setIsCopied] = useState(false);

  const goTo = siteConfig.redirects;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(userProfileLink);
    setIsCopied(true);
    toast.success('Copied URL to clipboard!');
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById('qr-code');
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = currentUser?.handle
      ? `${currentUser?.handle}.png`
      : 'qr-code.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <>
      <div>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 backdrop-blur-sm bg-gray-800 bg-opacity-50 sm:w-full" />
          <Dialog.Content
            className="contentShow fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                rounded-2xl bg-white p-6 sm:p-8 lg:max-w-3xl w-[350px] sm:w-[500px] shadow-lg 
                md:max-w-lg max-md:max-w-lg focus:outline-none"
          >
            <div className="flex flex-row justify-between items-center mb-1">
              <Dialog.Title className="text-xl text-center font-medium mb-2 sm:mb-0 sm:mr-4">
                Share your Link
              </Dialog.Title>

              <Dialog.Close className="flex flex-end justify-end">
                <div className="flex justify-center items-center p-2 rounded-full bg-gray-100 hover:bg-gray-300">
                  <Image priority src={closeSVG} alt="close" />
                </div>
              </Dialog.Close>
            </div>

            <Tabs.Root
              defaultValue="url"
              className="border border-gray-300 w-full rounded-lg mt-4"
            >
              <Tabs.List className="flex">
                <Tabs.Trigger
                  value="url"
                  className="flex-1 py-2 px-4 text-center data-[state=active]:text-[#10172a] data-[state=active]:rounded-tl-lg data-[state=active]:bg-gray-100 data-[state=active]:border-b data-[state=active]:border-[#10172a] text-gray-600 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 rounded-tl-lg"
                >
                  URL
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="QR"
                  className="flex-1 py-2 px-4 text-center data-[state=active]:text-[#10172a] data-[state=active]:rounded-tr-lg data-[state=active]:bg-gray-100 data-[state=active]:border-b data-[state=active]:border-[#10172a] text-gray-600 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 rounded-tr-lg"
                >
                  QR Code
                </Tabs.Trigger>
              </Tabs.List>

              <div className="p-4">
                <Tabs.Content value="url">
                  <div className="mb-6">
                    <div className="mt-2 mb-4">
                      <p className="text-sm">
                        Add this link to your{' '}
                        <a
                          target="_blank"
                          href={goTo.twitter}
                          className="underline"
                        >
                          Twitter
                        </a>
                        ,{' '}
                        <a
                          target="_blank"
                          href={goTo.instagram}
                          className="underline"
                        >
                          Instagram
                        </a>{' '}
                        or{' '}
                        <a
                          target="_blank"
                          href={goTo.linkedin}
                          className="underline"
                        >
                          LinkedIn
                        </a>{' '}
                        bio{' '}
                        <span aria-label="rocket">
                          to make it accessible from anywhere. 🚀
                        </span>
                      </p>
                    </div>
                    <div className="relative mb-4">
                      <div className="flex justify-between items-center w-full h-6 px-4 py-[28px] mb-2 text-gray-700 border-2 rounded-2xl appearance-none focus:outline-none focus:shadow-outline">
                        <h2 className="truncate w-[250px] lg:w-full">
                          {userProfileLink}
                        </h2>
                        <button
                          onClick={handleCopyLink}
                          className="w-[80px] p-[12px] leading-none text-md text-white bg-slate-900 hover:bg-slate-700 rounded-3xl focus:outline-none focus:shadow-outline-blue"
                        >
                          {isCopied ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  </div>
                </Tabs.Content>

                <Tabs.Content value="QR">
                  <QRCodeCanvas
                    className="mx-auto w-full"
                    id="qr-code"
                    size={256}
                    includeMargin={true}
                    level="H"
                    value={userProfileLink}
                  />

                  <p className="mt-4 text-center text-gray-700">
                    Share this QR code with your audience to provide access to
                    your profile.
                  </p>
                  <button
                    onClick={downloadQRCode}
                    className="mt-4 w-full py-3 px-4 text-center text-white bg-slate-900 hover:bg-slate-700
					          rounded-md focus:outline-none focus:shadow-outline-blue"
                  >
                    Download QR Code
                  </button>
                </Tabs.Content>
              </div>
            </Tabs.Root>
          </Dialog.Content>
        </Dialog.Portal>
      </div>
    </>
  );
};

export default ShareModal;
