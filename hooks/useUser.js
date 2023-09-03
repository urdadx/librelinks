import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const useUser = (handle) => {
  return useQuery({
    queryKey: ['users', handle],
    queryFn: async () => {
      const response = await axios.get(`/api/users/${handle}`);
      return response.data;
    },
    enabled: handle !== null,
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data.message || 'An error occurred');
    },
    refetchOnWindowFocus: true,
  });
};

export default useUser;
