import { GripVertical, BarChart, Copy } from "lucide-react";
import InfoPopover from "../../utils/popover";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { getApexDomain, timeAgo } from "@/utils/helper-funcs";
import { GOOGLE_FAVICON_URL } from "@/utils/constants";
import Image from "next/image";

const Link = ({ id, title, url, archived, clicks, createdAt }) => {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    const apexDomain = getApexDomain(url); 
      
    return ( 
        <>
        <div ref={setNodeRef} style={style} 
            className="flex bg-white items-center p-2 rounded-lg drop-shadow-md my-5">
                <div className=" text-gray-400 text-sm hover:bg-blue-100 rounded-sm p-[3px]"  
                    {...attributes} {...listeners}>
                    <GripVertical color="grey" size={17} />
                </div>
            <Image 
                src={`${GOOGLE_FAVICON_URL}${apexDomain}`}
                alt={apexDomain}
                className="h-8 w-8 blur-0 rounded-full sm:h-10 sm:w-10"
                unoptimized
                width={20}
                height={20}
                priority
            />
            <div className="flex-1 p-2 h-full relative">
                <div className="flex">
                    <div className="w-full pr-3">
                        <div className="grid mb-1 w-full grid-cols-[minmax(0,_90%)] items-baseline">
                            
                            <div className=" w-full row-start-1 col-start-1 items-center">
                                <div target="_blank" className="flex items-center gap-4 max-w-full 
                                    rounded-[2px] outline-offset-2 outline-2">
                                    <p className=" text-gray-500 text-sm
                                        whitespace-nowrap overflow-hidden font-semibold w-auto sm:max-w-ful text-ellipsis">
                                        {title}
                                    </p>
                                    
                                    <div className="flex justify-between items-start">
                                    <div className="flex flex-wrap gap-2">
                                        
                                        <a href="#" 
                                            className="group rounded-full bg-gray-100 p-1.5 transition-all duration-75 hover:scale-105 hover:bg-blue-100 active:scale-95">
                                            <Copy color="grey" size={15} />
                                        </a>   
                                    
                                        <a href="/analytics" className="flex items-center space-x-1 rounded-md bg-gray-100 px-2 py-0.5 transition-all duration-75 hover:scale-105 hover:bg-blue-100 active:scale-100">
                                            <BarChart color="grey" size={15} />
                                            <p className="whitespace-nowrap text-sm text-gray-500">
                                                {clicks}
                                                <span className="ml-1 hidden sm:inline-block">
                                                    clicks
                                                </span>
                                            </p>
                                        </a>                         
                                    </div>
                                
                                </div>
                                </div>   
                        </div>

                        <div className="">
                            <div className="row-start-1 col-start-1 inline-flex">
                                <a target="_blank" href={url}
                                    className="flex items-center max-w-full rounded-[2px] outline-offset-2 outline-2">
                                    <p className="text-gray-500 w-[200px] text-sm lg:w-[320px]
                                        whitespace-nowrap overflow-hidden font-semibold text-ellipsis">
                                        {url}
                                    </p>
                                
                                </a>   
                            </div>
                        </div>
            
                    </div>
                    </div>
                    <button className="flex justify-center items-center ">
                        <div className="flex items-center">
                        <small className="mr-8 hidden whitespace-nowrap text-sm text-gray-500 sm:block">
                            Added {timeAgo(createdAt, true)} ago
                        </small>
                            <InfoPopover id={id} title={title} url={url} archived={archived} />
                        </div>
                    </button>

                </div>
                

            </div>
        </div>
        </>
     );
}
 
export default Link;