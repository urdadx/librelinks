import Preview from '../../profile-preview/preview';
import React from 'react';

const PreviewModal = ({ close }) => {
  return (
    <React.Fragment>
      <div className="fixed  bg-gray-800 h-screen">
        <div className=" bg-white rounded-xl fixed top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen p-6">
          <button onClick={close} className="absolute top-0 right-0 p-2">
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
          <Preview />
        </div>
      </div>
    </React.Fragment>
  );
};

export default PreviewModal;
