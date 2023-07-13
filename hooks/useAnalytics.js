import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const useAnalytics = (filter, userId) => {
  return useQuery(
    {
      queryKey: ["analytics", filter],
      queryFn: async () => {
        const response = await axios.get(
          `/api/analytics/views/${userId}?filterOption=${filter}`
        );
        return response.data;
      },
      onError: () => {
        toast.error("An error occurred");
      },
      refetchInterval: 2000,
    },
    { enabled: !!userId && !! filter}
  );
};

export default useAnalytics;