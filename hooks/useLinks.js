import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const useLinks = (userId) => {
  const fetchLinks = async () => {
    const response = await axios.get(`/api/links?userId=${userId}`);
    return response.data;
  };

  return useQuery({
    queryKey: ['links', userId],
    queryFn: fetchLinks,
    enabled: !!userId,
    onError: () => {
      toast.error('An error occurred');
    },
  });
};

export default useLinks;
