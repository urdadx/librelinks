import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const useUser = (handle) => {
  const normalizedHandle =
    typeof handle === 'string' ? handle.trim().toLowerCase() : handle;

  return useQuery({
    queryKey: ['user', normalizedHandle],
    queryFn: async () => {
      const response = await axios.get(`/api/users/${normalizedHandle}`);
      return response.data;
    },
    enabled: !!normalizedHandle,
    onError: (error) => {
      toast.error(error?.response?.data.message || 'An error occurred');
    },
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export default useUser;
