import { PieChart, Tooltip, Pie, Cell } from "recharts";

export const DeviceStats = ({ analytics }) => {
  //   const data = [
  //     { name: "Mobile", value: 12 },
  //     { name: "Desktop", value: 20 },
  //     { name: "Tablet", value: 7 },
  //     { name: "0ther", value: 2 },
  //   ];

  //   const devices = [
  //     { name: "Mobile", value: 12, color: "#0088FE" },
  //     { name: "Desktop", value: 20, color: "#00C49F" },
  //     { name: "Tablet", value: 7, color: "#FFBB28" },
  //     { name: "Other", value: 2, color: "#FF8042" },
  //   ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

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
                    style={{ background: `${COLORS[index % COLORS.length]}` }}
                    className="w-[8px] h-[8px] rounded-full"
                  />
                  <h3 className="text-sm lg:text-md">
                    {capitalizeFirstLetter(device)}
                  </h3>
                </div>
                <h3 className="font-semibold text-center">{visits}</h3>
              </div>
            ))}
          </div>
          <div className="w-[300px] mx-auto lg:w-[400px]">
            <PieChart width={400} height={250}>
              <Tooltip cursor={{ stroke: "red", strokeWidth: 2 }} />
              <Pie
                dataKey={"visits"}
                data={analytics}
                cx="50%"
                cy="50%"
                innerRadius={40}
              >
                {analytics?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </div>
        </div>
      </div>
    </>
  );
};
