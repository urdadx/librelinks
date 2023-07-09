import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const useCurrentUser = () => {
  return useQuery(
    ["users"],
    async () => {
      const response = await axios.get("/api/current");
      return response.data;
    },
    {
      onError: () => {
        toast.error("An error occurred");
      },
    }
  );
};

export default useCurrentUser;
