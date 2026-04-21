import { Share2 } from 'lucide-react';

const ShareButton = (props) => {
  return (
    <button
      {...props}
      className={`flex bg-white items-center gap-2 border-2 border-slate-300 text-black rounded-lg py-2 px-2 lg:px-4 hover:bg-gray-100 hover:border-slate-300 ${props.className || ''}`}
    >
      <Share2 size={17} />
      <h3 className="text-sm">Share your page</h3>
    </button>
  );
};

export default ShareButton;
