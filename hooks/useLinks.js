import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const useLinks = (userId) => {
  const fetchLinks = async () => {
    const response = await axios.get(`/api/links?userId=${userId}`);
    return response.data;
  };

  return useQuery(["links", userId], fetchLinks, {
    enabled: userId !== null,
    onError: () => {
      toast.error("An error occurred");
    },
    refetchInterval: 4000,
    retryOnMount: true,
    refetchOnWindowFocus: true,
  });
};

export default useLinks;
