import * as Avatar from "@radix-ui/react-avatar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";

export const UserAvatar = () => {
	const { data: currentUser } = useCurrentUser();
	const { data: fetchedUser } = useUser(currentUser?.handle);

	return (
		<>
			<Avatar.Root
				className="inline-flex h-[35px] w-[35px] border-2 border-blue-300
				 items-center justify-center overflow-hidden rounded-full align-middle lg:w-[45px] lg:h-[45px]">
				<Avatar.Image
					className="h-full w-full rounded-[inherit] object-cover"
					src={fetchedUser && fetchedUser?.image}
					referrerPolicy="no-referrer"
					alt="avatar"
				/>
				<Avatar.Fallback
					className="leading-1 flex h-full w-full items-center justify-center bg-slate-900 text-[15px] text-white font-medium"
					delayMs={100}>
					@
				</Avatar.Fallback>
			</Avatar.Root>
		</>
	);
};

export const UserAvatarSetting = () => {
	const { data: currentUser } = useCurrentUser();
	const { data: fetchedUser } = useUser(currentUser?.handle);

	return (
		<>
			<Avatar.Root
				className="inline-flex h-[100px] w-[100px] 
				 items-center justify-center overflow-hidden rounded-full align-middle">
				<Avatar.Image
					className="h-full w-full rounded-[inherit] object-cover"
					src={fetchedUser && fetchedUser?.image}
					referrerPolicy="no-referrer"
					alt="avatar"
				/>
				<Avatar.Fallback
					className="leading-1 flex h-full w-full items-center justify-center bg-slate-900 text-[35px] text-white font-medium"
					delayMs={100}>
					@
				</Avatar.Fallback>
			</Avatar.Root>
		</>
	);
};
