import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const useDeviceAnalytics = (handle) => {
  return useQuery({
    queryKey: ['device-analytics', handle],
    queryFn: async () => {
      const response = await axios.get(
        `/api/analytics/views/device?handle=${handle}`
      );
      return response.data;
    },
    enabled: !!handle,
    onError: () => {
      toast.error('An error occurred');
    },
    // refetchInterval: 2000,
  });
};

export default useDeviceAnalytics;
