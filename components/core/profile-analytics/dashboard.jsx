import Chart from './bar-chart';
import Select from 'react-select';
import LinkStats from './link-stats';
import useCurrentUser from '@/hooks/useCurrentUser';
import useAnalytics from '@/hooks/useAnalytics';
import { useState } from 'react';
import { LocationStats } from './location-stats';
import { DeviceStats } from './device-stats';
import useLocationAnalytics from '@/hooks/useLocationAnalytics';
import useDeviceAnalytics from '@/hooks/useDeviceAnalytics';

export function AnalyticsDashboard() {
  const options = [
    { value: 'last_hour', label: 'Last hour' },
    { value: 'last_24_hours', label: 'Last 24 hours' },
    { value: 'last_7_days', label: 'Last 7 days' },
    { value: 'last_30_days', label: 'Last 30 days' },
  ];

  const { data: currentUser } = useCurrentUser();
  const [filter, setFilter] = useState('last_hour');

  const { data: visitAnalytics } = useAnalytics(filter, currentUser?.handle);
  const { data: locationAnalytics } = useLocationAnalytics(currentUser?.handle);
  const { data: deviceAnalytics } = useDeviceAnalytics(currentUser?.handle);

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h3 className="text-xl font-semibold">Analytics</h3>
        <Select
          onChange={(option) => setFilter(option.value)}
          className="w-[170px]"
          defaultValue={options[0]}
          options={options}
        />
      </div>
      <Chart analytics={visitAnalytics} />
      <LinkStats />
      <DeviceStats analytics={deviceAnalytics} />
      <LocationStats analytics={locationAnalytics} />
    </>
  );
}
