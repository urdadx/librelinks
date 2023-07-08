import Chart from "./bar-chart";
import Select from 'react-select';
import LinkStats from "./link-stats";


export function AnalyticsDashboard(){

  const options = [
    { value: '24h', label: 'Last 24 hours'},
    { value: '1hr', label: 'Last hour' },
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' }

  ]

  return (
    <>
        <div className="flex w-full items-center justify-between">
            <h3 className="text-xl font-semibold">Analytics</h3>
            <Select className="w-[170px]"  defaultValue={options[0]} options={options} />
        </div>
        <Chart />
        <LinkStats />
        
    
    </>
  )
}

