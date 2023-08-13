import React from 'react';
import Layout from '@/components/layout/Layout';
import useFeedback from '@/hooks/useFeedback';
import Loader from '@/components/utils/loading-spinner';
export default function FeedbackTable() {
    
  const { data: feedbacks, isLoading } = useFeedback();

  if(isLoading){
     return <>
        <div className='flex flex-col w-[80%] mx-auto'>
            <Loader
                bgColor={"black"}
                message={"Fetching feedbacks"}
            />
        </div>
     </>
  }

  return (
    <Layout>
    <div className="flex flex-col w-[80%] mx-auto">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">#</th>
                  <th scope="col" className="px-6 py-4">Feedback</th>
                </tr>
              </thead>
              <tbody>
                {
                    feedbacks?.map(( feedback , index) => {
                        return (
                            <>
                                <tr
                                    key={index}
                                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-gray-100">
                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                    {index + 1}
                                </td>
                                <td className="truncate max-w-[200px] lg:max-w-[400px] whitespace-nowrap px-6 py-4">
                                    {feedback.description}
                                </td>
                                </tr>
                                
                            </>
                        )
                    })
                }

               
              </tbody>
            </table>
                {
                    feedbacks?.length == 0 && 
                    <>
                        <div className='flex justify-center text-lg my-14'>
                            No feedback added yet
                        </div>
                    </>
                }
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}