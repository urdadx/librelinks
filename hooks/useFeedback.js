import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const useFeedback = () => {
	const fetchFeedback = async () => {
		const response = await axios.get(`/api/feedback`);
		return response.data;
	};

	return useQuery({
		queryKey: ["feedback"],
		queryFn: fetchFeedback,
		onError: () => {
			toast.error("An error occurred");
		},
	});
};

export default useFeedback;
