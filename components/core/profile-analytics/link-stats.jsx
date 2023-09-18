/* eslint-disable @next/next/no-img-element */
import { BarChart } from 'lucide-react';
import useLinks from '@/hooks/useLinks';
import useCurrentUser from '@/hooks/useCurrentUser';
import Loader from '@/components/utils/loading-spinner';
import { getApexDomain } from '@/utils/helpers';
import { GOOGLE_FAVICON_URL } from '@/utils/constants';
import { useState } from 'react';
import StarSVG from '@/components/utils/star-svg';
import Link from 'next/link';

const LinkStats = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: userLinks, isLoading } = useLinks(currentUser?.id);
  const [showAll, setShowAll] = useState(false);

  const displayedLinks = showAll ? userLinks : userLinks?.slice(0, 3);

  const handleShowMore = () => {
    setShowAll(true);
  };

  const handleShowLess = () => {
    setShowAll(false);
  };

  return (
    <>
      <div className="mt-10 w-full">
        <h3 className="text-xl font-semibold">Top performing links</h3>
        <div className="rounded-xl mt-4 border bg-white h-auto p-4">
          <div className="">
            <h3 className="font-semibold text-md px-3 pb-1">My Links</h3>
            <p className="text-gray-500 text-sm px-3 mb-2">
              Get useful insights on each link
            </p>
          </div>
          <div className="h-full w-full">
            {!isLoading ? (
              <>
                {displayedLinks?.length > 0 ? (
                  displayedLinks
                    .slice()
                    .sort((a, b) => b.clicks - a.clicks)
                    .map((userLink) => (
                      <div
                        key={userLink.id}
                        className="flex items-center p-2 rounded-lg"
                      >
                        <div className="h-8 w-8">
                          <img
                            src={`${GOOGLE_FAVICON_URL}${getApexDomain(
                              userLink.url
                            )}`}
                            alt={userLink.title}
                            className="h-8 w-8 blur-0 rounded-full sm:h-8 lg:w-8"
                            loading="lazy"
                          />
                        </div>
                        <div className="ml-4">
                          <p className="truncate w-[100px] text-md text-slate-900 font-medium leading-none md:w-auto lg:w-auto">
                            {userLink.title}
                          </p>
                        </div>
                        <div className="flex items-center ml-auto gap-2 font-medium">
                          <BarChart className="text-gray-500" size={17} />
                          <h4 className="text-md text-gray-500">
                            {userLink.clicks} clicks
                          </h4>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="flex flex-col gap-2 w-[180px] mx-auto py-6">
                    <StarSVG />
                    <h2 className="text-center">
                      No links added yet{' '}
                      <span role="img" aria-label="face holding back tears">
                        🥹
                      </span>
                      <Link
                        className="font-semibold text-blue-600 hover:underline underline-offset-1"
                        href="/admin"
                      >
                        Create one now
                      </Link>
                    </h2>
                  </div>
                )}
                {userLinks?.length > 3 && (
                  <div className="flex justify-center mt-2">
                    {showAll ? (
                      <button
                        className="text-blue-500 font-medium"
                        onClick={handleShowLess}
                      >
                        Show Less
                      </button>
                    ) : (
                      <button
                        className="text-blue-500 font-medium"
                        onClick={handleShowMore}
                      >
                        Show More
                      </button>
                    )}
                  </div>
                )}
              </>
            ) : (
              <Loader bgColor={'black'} textColor={'black'} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LinkStats;
