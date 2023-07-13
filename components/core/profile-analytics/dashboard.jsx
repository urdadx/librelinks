import Chart from "./bar-chart";
import Select from "react-select";
import LinkStats from "./link-stats";
import useCurrentUser from "@/hooks/useCurrentUser";
import useAnalytics from "@/hooks/useAnalytics";
import { useState } from "react";

export function AnalyticsDashboard() {
  const options = [
    // { value: "24h", label: "Last 24 hours" },
    { value: "1hr", label: "Last hour" },
    { value: "7d", label: "Last 7 days" },
    // { value: "15d", label: "Last 15 days" },
    { value: "30d", label: "Last 30 days" },
  ];
  const { data: currentUser } = useCurrentUser();
  const [filter, setFilter] = useState("1hr");
  const { data: analytics, isLoading: analyticsLoading } = useAnalytics(
    filter,
    currentUser?.id
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
    </>
  );
}
