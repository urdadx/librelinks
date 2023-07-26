/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useCallback, useMemo } from "react";
import LinkCard from "@/components/core/user-profile/links-card";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import useUser from "@/hooks/useUser";
import Loader from "@/components/utils/loading-spinner";
import NotFound from "@/components/utils/not-found";
import useLinks from "@/hooks/useLinks";
import Script from "next/script";
import { SocialCards } from "@/components/core/user-profile/social-cards";

const ProfilePage = () => {
	const { query } = useRouter();
	const { handle } = query;
	const [, setIsDataLoaded] = useState(false);

	const {
		data: fetchedUser,
		isLoading: isUserLoading,
		isFetching: isUserFetching,
	} = useUser(handle);

	const { data: userLinks, isFetching: isLinksFetching } = useLinks(fetchedUser?.id);

	const queryClient = useQueryClient();

	const theme = useMemo(
		() => ({
			primary: fetchedUser?.themePalette.palette[0],
			secondary: fetchedUser?.themePalette.palette[1],
			accent: fetchedUser?.themePalette.palette[2],
			neutral: fetchedUser?.themePalette.palette[3],
		}),
		[fetchedUser?.themePalette.palette]
	);

	// Memoizing the links to prevent expensive re-renders
	const socialLinks = useMemo(
		() => userLinks?.filter((link) => link.isSocial && !link.archived),
		[userLinks]
	);

	const nonSocialLinks = useMemo(
		() => userLinks?.filter((link) => !link.isSocial),
		[userLinks]
	);

	const mutation = useMutation(
		async (id) => {
			await axios.patch(`/api/analytics/clicks/${id}`);
		},
		{
			onError: (error) => {
				toast.error(
					(error.response && error.response.data.message) || "An error occurred"
				);
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["links", fetchedUser?.id] });
				queryClient.invalidateQueries({ queryKey: ["users", fetchedUser?.id] });
			},
		}
	);

	const handleRegisterClick = useCallback(
		async (id) => {
			await mutation.mutateAsync(id);
		},
		[mutation]
	);

	useEffect(() => {
		const handleMessage = () => {
			queryClient.invalidateQueries({ queryKey: ["links"] });
			queryClient.invalidateQueries({ queryKey: ["users"] });
		};

		window.addEventListener("message", handleMessage);

		return () => {
			window.removeEventListener("message", handleMessage);
		};
	}, [queryClient]);

	useEffect(() => {
		if (fetchedUser && userLinks) {
			setIsDataLoaded(true);
		}
	}, [fetchedUser, userLinks]);

	if (isUserLoading) {
		return <Loader message={"Loading..."} bgColor="black" textColor="black" />;
	}

	if (!fetchedUser?.id) {
		return <NotFound />;
	}

	return (
		<>
			{!query.isIframe ? (
				<Script
					defer
					src="https://unpkg.com/@tinybirdco/flock.js"
					data-host="https://api.tinybird.co"
					data-token={process.env.NEXT_PUBLIC_DATA_TOKEN}
				/>
			) : (
				""
			)}
			<section
				style={{ background: theme.primary }}
				className="h-[100vh] w-[100vw] no-scrollbar overflow-auto">
				<div className="flex items-center w-full mt-4 flex-col mx-auto max-w-3xl justify-center px-8 lg:mt-16">
					{(isLinksFetching || isUserFetching) && (
						<div className="absolute -top-5 left-2">
							<Loader
								strokeWidth={7}
								width={15}
								height={15}
								bgColor={theme.accent}
							/>
						</div>
					)}
					<img
						loading="lazy"
						className="rounded-full w-[70px] h-[70px] lg:w-[96px] lg:h-[96px]"
						alt={fetchedUser?.name}
						src={fetchedUser?.image}
					/>
					<p
						style={{ color: theme.accent }}
						className="font-bold text-white text-center text-sm mt-4 mb-2 lg:text-xl lg:mt-4">
						{fetchedUser?.name}
					</p>
					{fetchedUser?.bio && (
						<p
							style={{ color: theme.accent }}
							className="w-[150px] truncate text-center text-sm mt-1 mb-4 lg:text-xl lg:mb-4 lg:w-[500px]">
							{fetchedUser?.bio}
						</p>
					)}
					<div className="min-w-max flex flex-wrap gap-2 mb-8 lg:w-fit lg:gap-4">
						{socialLinks?.map(({ title, url }) => (
							<SocialCards
								key={title}
								title={title}
								url={url}
								color={theme.accent}
							/>
						))}
					</div>
					{nonSocialLinks?.map(({ id, ...link }) => (
						<LinkCard
							buttonStyle={fetchedUser?.buttonStyle}
							theme={theme}
							id={id}
							key={id}
							{...link}
							registerClicks={() => handleRegisterClick(id)}
						/>
					))}

					{nonSocialLinks?.length === 0 && socialLinks?.length === 0 && (
						<div className="flex justify-center">
							<h3
								style={{ color: theme.neutral }}
								className="pt-8 text-md text-white font-semibold lg:text-2xl">
								Hello World 🚀
							</h3>
						</div>
					)}
				</div>
				<div className="my-10 lg:my-24" />
				{nonSocialLinks?.length > 0 && (
					<footer className="relative left-1/2 bottom-0 transform -translate-x-1/2 w-[200px]">
						<p
							style={{ color: theme.accent }}
							className="text-sm text-semibold text-center w lg:text-lg">
							Made with{" "}
							<Link
								className="font-semibold"
								target="_blank"
								href="https://twitter.com/NerdyProgramme2">
								Librelinks
							</Link>
						</p>
					</footer>
				)}
			</section>
		</>
	);
};

export default ProfilePage;
