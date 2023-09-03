import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const useCurrentUser = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axios.get('/api/current');
      return response.data;
    },
    onError: (err) => {
      console.error(err.message);
    },
    refetchOnMount: 'always',
    refetchOnWindowFocus: 'always',
  });
};

export default useCurrentUser;
