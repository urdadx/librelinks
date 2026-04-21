import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const useCurrentUser = () => {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: async () => {
      const response = await axios.get('/api/current');
      return response.data;
    },
    staleTime: 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useCurrentUser;
