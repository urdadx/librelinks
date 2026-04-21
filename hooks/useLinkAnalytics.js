import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const useLinkAnalytics = (filter, userId) => {
  return useQuery({
    queryKey: ['link-analytics', userId, filter],
    queryFn: async () => {
      const response = await axios.get(
        `/api/analytics/views/links?userId=${userId}&filter=${filter}`
      );
      return response.data;
    },
    enabled: !!userId,
    staleTime: 30 * 1000,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    onError: () => {
      toast.error('An error occurred');
    },
  });
};

export default useLinkAnalytics;
