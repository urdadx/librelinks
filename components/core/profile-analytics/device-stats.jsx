import { PieChart, Tooltip, Pie, Cell } from "recharts";
import useWindowSize from "@/hooks/use-window-size";

export const DeviceStats = ({ analytics }) => {
	const COLORS = ["#0088FE", "#00C49F", " #c84e89", "#FFBB28", "#FF8042"];
	const { width } = useWindowSize();

	return (
		<>
			<div className="mt-10 w-full">
				<h3 className="text-xl font-semibold">Device Analytics</h3>
				<div className="rounded-2xl mt-4 border bg-white h-auto pt-6">
					<div className="flex items-center gap-x-4 justify-center lg:gap-x-10">
						{analytics?.map(({ device, visits }, index) => (
							<div key={device} className="flex flex-col gap-2">
								<div className="items-center flex gap-1">
									<div
										style={{
											background: `${
												COLORS[
													index % COLORS.length
												]
											}`,
										}}
										className="w-[8px] h-[8px] rounded-full"
									/>
									<h3 className="capitalize text-sm lg:text-md">
										{device}
									</h3>
								</div>
								<h3 className="font-semibold text-center">
									{visits}
								</h3>
							</div>
						))}
					</div>
					<div className=" mx-auto lg:w-[400px]">
						{analytics && (
							<PieChart width={width > 640 ? 400 : 350} height={250}>
								<Tooltip
									cursor={{ stroke: "red", strokeWidth: 2 }}
								/>
								<Pie
									dataKey="visits"
									data={analytics}
									cx="50%"
									cy="50%"
									innerRadius={40}>
									{analytics?.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={
												COLORS[
													index % COLORS.length
												]
											}
										/>
									))}
								</Pie>
							</PieChart>
						)}
						{!analytics && (
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
