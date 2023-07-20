import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import Image from "next/image";
import closeSVG from "@/public/close_button.svg";
import { validDomainRegex } from "@/utils/helper-funcs";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLinks from "@/hooks/useLinks";
import { refreshIframe } from "@/utils/helper-funcs";

const AddLinkModal = () => {
	const [title, setTitle] = useState("");
	const [url, setUrl] = useState("");
	const [urlError, setUrlError] = useState(false);

	const refreshIframe = () => {
		const iframe = (document.getElementById("preview").src += "");
	};

	const signalIframe = () => {
		const iframe = document.getElementById('preview');
		if (iframe) {
			iframe.contentWindow.postMessage('', '*');
		}
	}

	const { data: currentUser } = useCurrentUser();
	const userId = currentUser?.id ?? null;
	const { data: userLinks } = useLinks(userId);

	const queryClient = useQueryClient();

	const order = userLinks?.length;

	const addLinkMutation = useMutation(
		async ({ title, url, order }) => {
			await axios.post("/api/links", {
				title,
				url,
				order,
			});
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["links", userId] });
				setTitle("");
				setUrl("");
				signalIframe()
				// setTimeout(() => {
				// 	refreshIframe();
				// }, 1500);
			},
		}
	);

	const submitLink = async () => {
		if (title.trim() === "" || url.trim() === "") {
			toast.error("Please fill the form");
			return;
		}
		await toast.promise(addLinkMutation.mutateAsync({ title, url, order }), {
			loading: "Adding link",
			success: "Link added successfully",
			error: "An error occured",
		});
	};

	const handleUrlChange = (event) => {
		const urlValue = event.target.value;
		const isValidUrl = validDomainRegex.test(urlValue);

		setUrl(urlValue);
		setUrlError(!isValidUrl);
	};

	return (
		<>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-gray-800 bg-opacity-50 sm:w-full" />
				<Dialog.Content
					className="contentShow fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                rounded-2xl bg-white p-6 sm:p-8 lg:max-w-3xl w-[350px] sm:w-[500px] shadow-lg 
                md:max-w-lg max-md:max-w-lg focus:outline-none">
					<div className="flex flex-row justify-between items-center mb-4">
						<Dialog.Title className="text-xl text-center font-medium mb-2 sm:mb-0 sm:mr-4">
							Create new Link
						</Dialog.Title>
						<Dialog.Close className="flex flex-end justify-end">
							<div className="p-2 rounded-full flex justify-center items-center bg-gray-100 hover:bg-gray-300">
								<Image priority src={closeSVG} alt="close" />
							</div>
						</Dialog.Close>
					</div>
					<form name="add-link-form" className="mb-6">
						<div className="relative mb-4">
							<input
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className="block w-full h-10 px-4 py-6 mb-2 leading-tight text-gray-700 border rounded-2xl appearance-none focus:outline-none focus:shadow-outline"
								id="name"
								type="text"
								placeholder="Title"
							/>
						</div>
						<div className="relative">
							<input
								value={url}
								onChange={handleUrlChange}
								className={`block w-full h-10 px-4 py-6 mb-2 leading-tight text-gray-700 border rounded-2xl appearance-none focus:outline-none ${
									urlError
										? "border-red-500"
										: "focus:shadow-outline"
								}`}
								id="url"
								type="url"
								placeholder="URL"
							/>
							{urlError && (
								<small className="text-red-500 text-sm">
									Enter a valid URL
								</small>
							)}
						</div>

						<Dialog.Close asChild>
							<button
								onClick={submitLink}
								disabled={urlError}
								className={`inline-block w-full px-4 py-4 leading-none 
                      text-lg mt-2 text-white rounded-3xl 
                      ${!urlError ? "bg-slate-800 hover:bg-slate-900" : "bg-slate-500"}`}>
								Create Link ✨
							</button>
						</Dialog.Close>
					</form>
				</Dialog.Content>
			</Dialog.Portal>
		</>
	);
};

export default AddLinkModal;
