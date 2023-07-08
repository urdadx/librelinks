import * as Avatar from '@radix-ui/react-avatar';
import { getInitials } from '@/utils/helper-funcs';
import useCurrentUser from '@/hooks/useCurrentUser';

export const UserAvatar = () => {

    const { data: currentUser } =  useCurrentUser();

    const usernameInitials = getInitials(currentUser ? currentUser.name : "@");

    return ( 
        <>
            <Avatar.Root 
                className="inline-flex h-[35px] w-[35px] border-2 border-blue-300  items-center justify-center overflow-hidden rounded-full align-middle lg:w-[45px] lg:h-[45px]">
                    <Avatar.Image
                        className="h-full w-full  rounded-[inherit] object-cover"
                        src={currentUser ? currentUser?.image : "/public/placeholder.png"}
                        referrerPolicy='no-referrer'
                        alt="avatar"
                    />
                    <Avatar.Fallback
                        className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
                        delayMs={600}>
                        {usernameInitials ? usernameInitials : "@"}
                    </Avatar.Fallback>
                </Avatar.Root>
        </>
     );
}
 
