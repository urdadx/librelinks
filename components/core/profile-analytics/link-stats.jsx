import { BarChart } from "lucide-react";
import useLinks from "@/hooks/useLinks";
import useCurrentUser from "@/hooks/useCurrentUser";
import Loader from "@/components/utils/loading-spinner";
import { getApexDomain } from "@/utils/helper-funcs";
import { GOOGLE_FAVICON_URL } from "@/utils/constants";
import Image from "next/image";

const LinkStats = () => {
    
    const { data: currentUser } = useCurrentUser();
    const { data: userLinks, isLoading } = useLinks(currentUser?.id);

    return (  
        <>
        <div className="mt-10 rounded-2xl border bg-white p-4 w-full h-auto">
            <div className="">
                <h3 className="font-semibold text-md px-3 pb-1">Statistics</h3>
                <p className="text-gray-500 text-sm px-3 mb-2">Insights on each social link</p>
            </div>
            <div className="h-full w-full">
                {
                    !isLoading ? (
                        <>
                            {
                                userLinks?.length > 0 ? userLinks?.map((userLink) => {
                                    return <>
                                        <div className="flex items-center p-3 rounded-lg">
                                            <div className="h-10 w-10">
                                                <Image 
                                                    src={`${GOOGLE_FAVICON_URL}${getApexDomain(userLink.url)}`}
                                                    alt={userLink.title}
                                                    className="h-8 w-8 blur-0 rounded-full sm:h-10 sm:w-10"
                                                    unoptimized
                                                    width={25}
                                                    height={25}
                                                    priority
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-md text-slate-900 font-medium leading-none">
                                                    {userLink.title}
                                                </p>
                                            </div>
                                            <div className="flex items-center ml-auto gap-2 font-medium">
                                                <BarChart className="text-gray-500" size={17} />
                                                <h4 className="text-md text-gray-500">{userLink.clicks} clicks</h4>
                                            </div>
                                        </div>

                                    </>
                                }) : <div className="w-[200px] mx-auto py-6">
                                    <h2>No Links added yet...</h2>
                                </div>
                            } 
                        
                        </>
                    ) : <Loader bgColor={"black"} textColor={"black"} />
                }
     


        </div>
        </div>
        </>
    );
}
 
export default LinkStats;