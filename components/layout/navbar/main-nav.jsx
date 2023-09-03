import Link from 'next/link';
import { siteConfig } from '@/config/site';

const SiteHeader = () => {
  return (
    <>
      <div className="flex mx-4 gap-2">
        <Link href="/" className="items-center space-x-2 md:flex">
          <span className="font-bold text-lg sm:inline-block">
            {siteConfig.name}
          </span>
        </Link>
      </div>
    </>
  );
};

export default SiteHeader;
