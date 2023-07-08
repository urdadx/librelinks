import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useLink = (linkId) => {
  const { data, error, isLoading, mutate } = useSWR(
    linkId ? `/api/links/${linkId}` : null,
    fetcher,
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useLink;
