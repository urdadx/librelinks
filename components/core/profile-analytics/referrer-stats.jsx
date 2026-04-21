import { Globe } from 'lucide-react';
import { useEffect, useState } from 'react';

export const ReferrerStats = ({ analytics }) => {
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setShowAll(false);
  }, [analytics]);

  const displayedReferrers = showAll ? analytics : analytics?.slice(0, 4);

  return (
    <div className="mt-10 w-full">
      <h3 className="text-xl font-semibold">Top Referrers</h3>
      <div className="rounded-xl mt-4 border bg-white h-auto p-4">
        <div>
          <h3 className="font-semibold text-md px-3 pb-1">Sources</h3>
          <p className="text-gray-500 text-sm px-3 mb-2">
            See where visitors are coming from
          </p>
        </div>
        <div className="w-full h-auto">
          {displayedReferrers?.length > 0 ? (
            displayedReferrers.map(({ referrer, visits }) => (
              <div key={referrer} className="flex items-center p-2 rounded-lg">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-slate-50">
                  <Globe size={16} className="text-slate-600" />
                </div>
                <div className="ml-3">
                  <p className="truncate w-[180px] text-md text-slate-900 font-medium leading-none lg:w-auto">
                    {referrer}
                  </p>
                </div>
                <div className="ml-auto font-medium text-gray-500">{visits}</div>
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
                <button className="text-blue-500 font-medium" onClick={() => setShowAll(false)}>
                  Show Less
                </button>
              ) : (
                <button className="text-blue-500 font-medium" onClick={() => setShowAll(true)}>
                  Show More
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
