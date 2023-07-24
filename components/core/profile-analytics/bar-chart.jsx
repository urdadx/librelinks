import Loader from "@/components/utils/loading-spinner";
import { BarChart as SimpleChart } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

function calculateTotalViews(data) {
  let totalViews = 0;

  for (const item of data) {
    totalViews += item.visits;
  }

  return totalViews;
}
const Chart = ({ analytics }) => {
  return (
    <>
      <div className="mt-4 rounded-2xl border bg-white p-4 w-full h-auto">
        <p className="font-semibold text-sm px-3 pb-2">Total views</p>
        <div className="flex items-center gap-2 font-semibold text-2xl px-3 pb-2">
          {analytics ? <h3>{calculateTotalViews(analytics)}</h3> : <h3>-</h3>}
          <SimpleChart />
        </div>
        <ResponsiveContainer width="100%" height={350}>
          {analytics ? (
            <BarChart data={analytics}>
              <XAxis
                dataKey="t"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                allowDecimals={false}
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={value => `${value}`}
              />
              <Bar dataKey="visits" fill="#adfa1d" radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : (
            <div>
              <Loader message={"Fetching data"} />
            </div>
          )}
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Chart;
