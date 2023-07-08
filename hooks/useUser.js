import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const useUser = (handle) => {
  const { data, error, isLoading, mutate } = useSWR(
    handle ? `/api/users/${handle}` : null,
    fetcher,
    {
      revalidateOnFocus: true
    }
    // {
    //   refreshInterval: 2000,
    // }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUser;
