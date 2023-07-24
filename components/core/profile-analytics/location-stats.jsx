/* eslint-disable @next/next/no-img-element */
import COUNTRIES from "@/utils/constants/countries";

const contryData = [
	{ country: "US", visits: 14 },
	{ country: "CH", visits: 5 },
	{ country: "GH", visits: 2 },
];

export const LocationStats = () => {
	return (
		<>
			<div className="mt-10 w-full">
				<h3 className="text-xl font-semibold">Locations</h3>
				<div className="rounded-lg mt-4 border bg-white h-auto p-4">
					<div className="">
						<h3 className="font-semibold text-md px-3 pb-1">Visitors</h3>
						<p className="text-gray-500 text-sm px-3 mb-2">
							Track visitors on your page by country
						</p>
					</div>
					<div className="w-full h-auto">
						{contryData?.map(({ country, visits }) => (
							<div
								key={country}
								className="flex items-center p-2 rounded-lg">
								<div className="h-8 w-8 border rounded-full">
									<img
										src={`https://flag.vercel.app/m/${country}.svg`}
										alt={country}
										className="h-8 w-8 blur-0 rounded-full lg:h-8 lg:w-8"
										loading="lazy"
									/>
								</div>
								<div className="ml-2">
									<p className="truncate w-[150px] capitalize text-md text-slate-900 font-medium leading-none lg:w-auto">
										{COUNTRIES[country]}
									</p>
								</div>
								<div className="flex items-center ml-auto gap-2 font-medium">
									<h4 className="text-md text-gray-500">
										{visits}
									</h4>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};
