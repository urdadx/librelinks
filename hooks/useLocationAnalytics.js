import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const useLocationAnalytics = (handle) => {
  return useQuery({
    queryKey: ['location-analytics', handle],
    queryFn: async () => {
      const response = await axios.get(
        `/api/analytics/views/location?handle=${handle}`
      );
      return response.data;
    },
    enabled: !!handle,
    onError: () => {
      toast.error('An error occurred');
    },
  });
};

export default useLocationAnalytics;
