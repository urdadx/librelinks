import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const useUser = (handle) => {
  return useQuery(
    ["users", handle],
    async () => {
      const response = await axios.get(`/api/users/${handle}`);
      return response.data;
    },
    {
      enabled: handle !== null,
      onError: (error) => {
        toast.error(error?.response?.data.message || "An error occurred");
      },
      refetchInterval: 3000,
      retryOnMount: true,
      refetchOnWindowFocus: true,
    }
  );
};

export default useUser;
