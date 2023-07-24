import Chart from "./bar-chart";
import Select from "react-select";
import LinkStats from "./link-stats";
import useCurrentUser from "@/hooks/useCurrentUser";
import useAnalytics from "@/hooks/useAnalytics";
import { useState } from "react";
import { LocationStats } from "./location-stats";
import { DeviceStats } from "./device-stats";

export function AnalyticsDashboard() {
  const options = [
    { value: "last_24_hours", label: "Last 24 hours" },
    { value: "last_hour", label: "Last hour" },
    { value: "last_7_days", label: "Last 7 days" },
    // { value: "15d", label: "Last 15 days" },
    { value: "last_30_days", label: "Last 30 days" },
  ];
  const { data: currentUser } = useCurrentUser();
  const [filter, setFilter] = useState("last_24_hours");
  const { data: analytics, isLoading: analyticsLoading } = useAnalytics(
    filter,
    currentUser?.handle
  );
  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h3 className="text-xl font-semibold">Analytics</h3>
        <Select
          onChange={option => setFilter(option.value)}
          className="w-[170px]"
          defaultValue={options[0]}
          options={options}
        />
      </div>
      <Chart analytics={analytics} />
      <LinkStats />
      <DeviceStats />
      <LocationStats />
    </>
  );
}
