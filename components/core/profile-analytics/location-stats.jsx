/* eslint-disable @next/next/no-img-element */
import COUNTRIES from '@/utils/constants/countries';
import { useState } from 'react';
import Avatar from 'boring-avatars';

export const LocationStats = ({ analytics }) => {
  const [showAll, setShowAll] = useState(false);

  const displayedCountries = showAll ? analytics : analytics?.slice(0, 4);

  const handleShowMore = () => {
    setShowAll(true);
  };

  const handleShowLess = () => {
    setShowAll(false);
  };

  return (
    <>
      <div className="mt-10 w-full">
        <h3 className="text-xl font-semibold">Top Locations</h3>
        <div className="rounded-xl mt-4 border bg-white h-auto p-4">
          <div className="">
            <h3 className="font-semibold text-md px-3 pb-1">Visitors</h3>
            <p className="text-gray-500 text-sm px-3 mb-2">
              Track visitors on your page by country
            </p>
          </div>
          <div className="w-full h-auto">
            {displayedCountries?.length > 0 ? (
              displayedCountries
                .slice()
                .sort((a, b) => b.visits - a.visits)
                .map(({ location, visits }) => (
                  <div
                    key={location}
                    className="flex items-center p-2 rounded-lg"
                  >
                    {location ? (
                      <div className="h-8 w-8 border rounded-full">
                        <img
                          src={`https://flag.vercel.app/m/${location}.svg`}
                          alt={location}
                          className="h-8 w-8 blur-0 rounded-full lg:h-8 lg:w-8"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <Avatar
                        size={32}
                        name="Unknown Location"
                        variant="marble"
                      />
                    )}
                    <div className="ml-2">
                      <p className="truncate w-[150px] capitalize text-md text-slate-900 font-medium leading-none lg:w-auto">
                        {location ? COUNTRIES[location] : 'Unknown'}
                      </p>
                    </div>
                    <div className="flex items-center ml-auto gap-2 font-medium">
                      <h4 className="text-md text-gray-500">{visits}</h4>
                    </div>
                  </div>
                ))
            ) : (
              <div className="my-6 flex justify-center">
                <h3 className="text-center">No data available</h3>
              </div>
            )}

            {analytics?.length > 4 && (
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
          </div>
        </div>
      </div>
    </>
  );
};
