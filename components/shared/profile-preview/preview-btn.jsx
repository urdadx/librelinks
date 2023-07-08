import * as Dialog from '@radix-ui/react-dialog';
import PreviewModal from "../modals/preview-modal/preview-modal";

const PreviewBtn = () => {
    return (
        <>
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 lg:hidden">
                <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <button 
                         className="block py-2 px-6 rounded-full bg-slate-900
                         text-white text-center font-bold text-lg shadow-lg hover:bg-slate-600"
                        >
                            Preview
                      </button>
                    </Dialog.Trigger>
                    <PreviewModal />
                </Dialog.Root>

            </div>
        </>
    )
}

export default PreviewBtn;