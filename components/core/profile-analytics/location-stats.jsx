/* eslint-disable @next/next/no-img-element */
import COUNTRIES from "@/utils/constants/countries";

export const LocationStats = ({ analytics }) => {
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
						{analytics?.length > 0 ? (
							analytics?.map(({ location, visits }) => (
								<div
									key={location}
									className="flex items-center p-2 rounded-lg">
									<div className="h-8 w-8 border rounded-full">
										<img
											src={`https://flag.vercel.app/m/${location}.svg`}
											alt={location}
											className="h-8 w-8 blur-0 rounded-full lg:h-8 lg:w-8"
											loading="lazy"
										/>
									</div>
									<div className="ml-2">
										<p className="truncate w-[150px] capitalize text-md text-slate-900 font-medium leading-none lg:w-auto">
											{COUNTRIES[location]}
										</p>
									</div>
									<div className="flex items-center ml-auto gap-2 font-medium">
										<h4 className="text-md text-gray-500">
											{visits}
										</h4>
									</div>
								</div>
							))
						) : (
							<div className="my-6 flex justify-center">
								<h3 className="text-center">No data available</h3>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};
