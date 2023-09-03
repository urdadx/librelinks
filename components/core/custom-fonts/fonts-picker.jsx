import { useState } from 'react';
import { FontsModal } from '@/components/shared/modals/fonts-modal';
import * as Dialog from '@radix-ui/react-dialog';

const FontPicker = () => {
  const [selectedFont, setSelectedFont] = useState('');

  const handleFontSelect = (font) => {
    setSelectedFont(font);
    // Perform any font-related operations or store the selected font as needed
  };

  return (
    <>
      <div className="max-w-[640px] mx-auto my-10">
        <h3 className="text-xl font-semibold">Fonts</h3>
        <div className="mt-4 rounded-2xl border bg-white p-4 w-full h-auto">
          <h4 className="mb-2 text-sm font-semibold">Font</h4>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="mb-2 transition-color group w-full rounded-lg border border-sand bg-white ring-inset ring-black drop-shadow-lg">
                <span className="m-4 flex flex-wrap gap-4">
                  <span className="flex h-2xl w-2xl items-center justify-center rounded-lg bg-[#F3F3F1] text-lg p-3 transition-colors">
                    Aa
                  </span>
                  <span className="leading-tight flex shrink grow basis-0 flex-col justify-center text-left md:shrink-0">
                    {selectedFont || 'Select a font'}
                  </span>
                </span>
              </button>
            </Dialog.Trigger>
            <FontsModal onSelectFont={handleFontSelect} />
          </Dialog.Root>
        </div>
      </div>
    </>
  );
};

export default FontPicker;
