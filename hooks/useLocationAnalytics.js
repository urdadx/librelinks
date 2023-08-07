import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

const useLocationAnalytics = (handle) => {
  return useQuery({
    queryKey: ["location-analytics", handle ],
    queryFn: async () => {
      const response = await axios.get(
        `/my_api/analytics/views/location?handle=${handle}`
      );
      return response.data;
    },
    enabled: !!handle,
    onError: () => {
      toast.error("An error occurred");
    },
    // refetchInterval: 2000,
  });
};

export default useLocationAnalytics;