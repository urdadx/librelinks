// import useSWR from "swr";
// import fetcher from "@/lib/fetcher";

// const useLink = (linkId) => {
//   const { data, error, isLoading, mutate } = useSWR(
//     linkId ? [`/api/links/${linkId}`] : null,
//     fetcher
//   );

//   return {
//     data,
//     error,
//     isLoading,
//     mutate,
//   };
// };

// // export default useLink;

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const useLink = (linkId) => {
  const fetchLinks = async () => {
    const response = await axios.get(`/api/links/${linkId}`);
    return response.data;
  };

  return useQuery(["links", linkId], fetchLinks, {
    enabled: linkId !== null,
    onError: () => {
      toast.error("An error occurred");
    },
    refetchInterval: 4000,
  });
};

export default useLink;
