import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const useLocationAnalytics = (filter, handle) => {
  return useQuery({
    queryKey: ['location-analytics', handle, filter],
    queryFn: async () => {
      const response = await axios.get(
        `/api/analytics/views/location?handle=${handle}&filter=${filter}`
      );
      return response.data;
    },
    enabled: !!handle,
    staleTime: 30 * 1000,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    onError: () => {
      toast.error('An error occurred');
    },
  });
};

export default useLocationAnalytics;
