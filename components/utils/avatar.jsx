import * as Avatar from "@radix-ui/react-avatar";
import { getInitials } from "@/utils/helper-funcs";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";

export const UserAvatar = ({ size, hasBorder = true }) => {
	const { data: currentUser } = useCurrentUser();
	const { data: fetchedUser } = useUser(currentUser?.handle);

	const usernameInitials = getInitials(currentUser ? currentUser.name : "@");

	return (
		<>
			<Avatar.Root
				className={`inline-flex h-[${size}px] w-[${size}px] ${
					hasBorder && "border-2 border-blue-300"
				} items-center justify-center overflow-hidden rounded-full align-middle lg:w-[${
					size + 10
				}px] lg:h-[${size + 10}px]`}>
				<Avatar.Image
					className="h-full w-full rounded-[inherit] object-cover"
					src={fetchedUser && fetchedUser?.image}
					referrerPolicy="no-referrer"
					alt="avatar"
				/>
				<Avatar.Fallback
					className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
					delayMs={100}>
					{usernameInitials ? usernameInitials : "@"}
				</Avatar.Fallback>
			</Avatar.Root>
		</>
	);
};
