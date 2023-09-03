import Loader from '@/components/utils/loading-spinner';
import { BarChart as SimpleChart } from 'lucide-react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const calculateTotalViews = (data) => {
  let totalViews = 0;
  for (const item of data) {
    totalViews += item.visits;
  }
  return totalViews;
};
const Chart = ({ analytics }) => {
  return (
    <>
      <div className="mt-4 rounded-xl border bg-white py-4 px-2 w-full h-auto">
        <p className="font-semibold text-sm px-3 pb-2">Total visits</p>
        <div className="flex items-center gap-2 font-semibold text-2xl px-3 pb-2">
          {analytics ? (
            <h3>{calculateTotalViews(analytics)}</h3>
          ) : (
            <h3>
              <div className="mr-2 h-6 w-6 animate-pulse rounded-md bg-gray-200 lg:w-10 lg:h-10" />
            </h3>
          )}
          <SimpleChart />
        </div>
        <div className="">
          <ResponsiveContainer width="95%" height={300}>
            {analytics ? (
              <BarChart data={analytics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="t"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  minTickGap={15}
                />
                <YAxis
                  allowDecimals={false}
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip />
                <Bar dataKey="visits" fill="#adfa1d" />
              </BarChart>
            ) : (
              <div>
                <Loader bgColor={'black'} message={'Fetching data'} />
              </div>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default Chart;
