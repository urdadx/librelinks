import { PieChart, Tooltip, Pie, Cell } from 'recharts';
import useMediaQuery from '@/hooks/use-media-query';

export const DeviceStats = ({ analytics }) => {
  const COLORS = ['#0088FE', '#00C49F', ' #c84e89', '#FFBB28', '#FF8042'];
  const { isMobile } = useMediaQuery();

  return (
    <div className="mt-10 w-full">
      <h3 className="text-xl font-semibold text-inherit mb-4">
        Device Analytics
      </h3>
      <div className="rounded-xl border bg-white p-4">
        <div className="mb-4">
          <h3 className="font-semibold text-md px-3 pb-1">Devices</h3>
          <p className="text-gray-500 text-sm px-3">
            Insights on devices your audience use
          </p>
        </div>
        <div
          className={`flex flex-row gap-4 justify-center ${
            isMobile ? 'items-center' : 'lg:flex-row justify-center lg:gap-x-10'
          }`}
        >
          {analytics?.map(({ device, visits }, index) => (
            <div key={device} className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <div
                  style={{
                    background: `${COLORS[index % COLORS.length]}`,
                  }}
                  className="w-[8px] h-[8px] rounded-full"
                />
                <h3
                  className={`capitalize text-sm ${
                    isMobile ? 'text-center' : 'lg:text-md'
                  }`}
                >
                  {device}
                </h3>
              </div>
              <h3
                className={`font-semibold text-center ${
                  isMobile ? 'text-lg' : ''
                }`}
              >
                {visits}
              </h3>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-6 w-full md:w-[300px] lg:w-[400px]">
          {analytics?.length > 0 ? (
            <PieChart width={isMobile ? 300 : 400} height={250}>
              <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }} />
              <Pie
                dataKey="visits"
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
          ) : (
            <div className="my-6 flex justify-center">
              <h3 className="text-center">No data available</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
