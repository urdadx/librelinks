import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import Image from "next/image";
import closeSVG from "@/public/close_button.svg";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const FeebackForm = ({ close }) => {
	
	const [description, setDescription] = useState("");
	const queryClient = useQueryClient();

	const addFeedback = useMutation(
		async ({ description }) => {
			await axios.post("/api/feedback", {
				description
			});
		},
		{
			onSuccess: () => {
				setDescription("");	
				queryClient.invalidateQueries("feedback");
			},
		}
	);

	const submitFeedback = async () => {
		close();
		await toast.promise(addFeedback.mutateAsync({ description }), {
			loading: "Adding feedback",
			success: "Thank you for your feedback",
			error: "An error occured",
		});
	};


	return (
		<>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 backdrop-blur-sm bg-gray-800 bg-opacity-50 w-full" />
				<Dialog.Content className="z-50 contentShow fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 sm:p-8 lg:max-w-3xl w-[350px] sm:w-[500px] shadow-lg md:max-w-lg max-md:max-w-lg focus:outline-none">
					<div className="flex flex-row justify-between items-center mb-4">
						<Dialog.Title className="text-xl text-center font-medium mb-2 sm:mb-0 sm:mr-4">
							Write your feedback
						</Dialog.Title>
						<Dialog.Close onClick={close} className="flex flex-end justify-end">
							<div className="p-2 rounded-full flex justify-center items-center bg-gray-100 hover:bg-gray-300">
								<Image priority src={closeSVG} alt="close" />
							</div>
						</Dialog.Close>
					</div>
					<form name="add-link-form" className="mb-6">
						<div className="relative mb-4">
                            <textarea
                                value={description}
								onChange={(e) => setDescription(e.target.value)}
                                placeholder="Leave some feedback..."
                                className="outline-none w-full p-4 h-[120px] rounded-lg border-2
                              bg-gray-100 text-black focus:border-slate-900"
                            />
						</div>

						<Dialog.Close asChild>
							<button
								onClick={submitFeedback}
								className={`inline-block w-full px-4 py-4 leading-none 
                     			 text-lg mt-2 text-white rounded-3xl 
                      			bg-slate-800 hover:bg-slate-900`}>
								Submit ✨
							</button>
						</Dialog.Close>
					</form>
				</Dialog.Content>
			</Dialog.Portal>
		</>
	);
};

export default FeebackForm;
