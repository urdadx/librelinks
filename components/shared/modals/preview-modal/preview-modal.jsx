import * as Dialog from '@radix-ui/react-dialog';
import Preview from '../../profile-preview/preview';
import modalStyles from "../preview-modal/Modal.module.css";

const PreviewModal = () => {
	return (

		<Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-gray-800 bg-opacity-50" />
              	<Dialog.Content 
              		className={modalStyles.DialogContent}
                >
                	<Dialog.Trigger asChild>	
	                    <button className="absolute top-0 right-0 p-2">
					      <svg
					        xmlns="http://www.w3.org/2000/svg"
					        className="h-6 w-6"
					        fill="none"
					        viewBox="0 0 24 24"
					        stroke="currentColor"
					      >
					        <path
					          strokeLinecap="round"
					          strokeLinejoin="round"
					          strokeWidth={2}
					          d="M6 18L18 6M6 6l12 12"
					        />
					      </svg>
	    				</button>
    				</Dialog.Trigger>
             
              		<Preview />

              	</Dialog.Content>
        </Dialog.Portal>
    
   
	)
}

export default PreviewModal;