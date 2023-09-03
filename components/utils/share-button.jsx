import { Share2, GithubIcon } from 'lucide-react';
import Link from 'next/link';
import useMediaQuery from '@/hooks/use-media-query';

const ShareButton = () => {
  const isMobile = useMediaQuery();
  return (
    <>
      <div className="flex items-center gap-2">
        <button className="flex bg-white items-center gap-2 border-2 border-slate-300 text-black rounded-lg py-2 px-2 lg:px-4 hover:bg-gray-100 hover:border-slate-300">
          <Share2 size={17} />
          <h3 className="text-sm">Share</h3>
        </button>
        <Link
          href="https://github.com/urdadx/librelinks"
          target="_blank"
          className="flex bg-white items-center gap-2 border-2 border-slate-300 text-black rounded-lg py-2 px-2 lg:px-4 hover:bg-gray-100 hover:border-slate-300"
        >
          <GithubIcon size={isMobile ? 20 : 17} />
          <h3 className="text-sm lg:flex md:hidden hidden">Star on Github</h3>
        </Link>
      </div>
    </>
  );
};

export default ShareButton;
