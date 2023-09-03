import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import closeSVG from '@/public/close_button.svg';
import { useState } from 'react';

export const FontsModal = ({ onSelectFont }) => {
  const fonts = [
    'Epilogue',
    'Poppins',
    'Inter',
    'Roboto',
    'Open-Sans',
    'Raleway',
  ];
  const [selectedFont, setSelectedFont] = useState('');

  const handleFontSelect = (font) => {
    setSelectedFont(font);
    onSelectFont(font);
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 backdrop-blur-sm bg-gray-800 bg-opacity-50 sm:w-full">
        <Dialog.Content className="contentShow fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 sm:p-8 lg:max-w-3xl w-[350px] sm:w-[500px] shadow-lg md:max-w-lg max-md:max-w-lg focus:outline-none">
          <div className="flex flex-row justify-between items-center mb-4">
            <Dialog.Title className="text-xl text-center font-medium mb-2 sm:mb-0 sm:mr-4">
              Select a font
            </Dialog.Title>
            <Dialog.Close className="flex flex-end justify-end">
              <div className="p-2 rounded-full flex justify-center items-center bg-gray-100 hover:bg-gray-300">
                <Image priority src={closeSVG} alt="close" />
              </div>
            </Dialog.Close>
          </div>
          <div className="p-4  overflow-auto mb-4">
            <div className="flex flex-col gap-2 h-[200px]">
              {fonts.map((font) => (
                <button
                  key={font}
                  className={`rounded-3xl bg-[#F3F3F1] text-lg p-3 transition-colors ${
                    selectedFont === font ? 'bg-white' : ''
                  }`}
                  onClick={() => handleFontSelect(font)}
                >
                  {font}
                </button>
              ))}
            </div>
          </div>
          <Dialog.Close asChild>
            <button
              className="inline-block w-full px-4 py-4 leading-none text-lg my-4 
                        text-white rounded-3xl bg-slate-900"
            >
              Save ✨
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
};
