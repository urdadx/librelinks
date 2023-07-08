import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useLinks = (userId) => {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `/api/links?userId=${userId}` : null,
    fetcher,

  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useLinks;
