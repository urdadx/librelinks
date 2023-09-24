import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { TinyLoader } from '@/components/utils/tiny-loader';
import { useRouter } from 'next/router';
import Confetti from 'react-dom-confetti';
import Balancer from 'react-wrap-balancer';

const Onboarding = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [handle, setHandle] = useState('');
  const [handleTaken, setHandleTaken] = useState(false);
  const [isExploding, setIsExploding] = useState(false);

  const router = useRouter();

  const handleAddHandle = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);
      if (!handle || handle.trim() === '') {
        toast.error('Please fill the form');
        setIsLoading(false);
        return;
      }
      try {
        const response = await axios.patch('/api/edit', { handle: handle });
        setIsLoading(false);
        if (response.status === 200) {
          setIsExploding(true);
          toast.success(`${handle} is yours 🎉`);
          setTimeout(() => {
            router.push('/admin');
          }, 1500);
        }
      } catch (error) {
        setHandleTaken(true);
        setTimeout(() => {
          setHandleTaken(false);
        }, 2500);
        setIsLoading(false);
      }
    },
    [handle, router]
  );

  const config = {
    angle: '109',
    spread: '284',
    startVelocity: 40,
    elementCount: '113',
    dragFriction: '0.19',
    duration: '4080',
    stagger: 3,
    width: '10px',
    height: '10px',
    perspective: '500px',
    colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
  };

  const handleOnChange = (event) => {
    const value = event.target.value;
    setHandle(value);
    setHandleTaken(false);
  };
  return (
    <>
      <div
        className="absolute inset-0 bg-[url(../public/grid.svg)] bg-center 
       			[mask-image:linear-gradient(180deg,rgba(255,255,255,0))] bg-repeat"
      />
      <div className="absolute w-full flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="mx-auto h-[30px] w-[30px] bg-slate-900 rounded-full" />
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            <Balancer>Claim your unique handle ✨</Balancer>
          </h2>
        </div>
        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleAddHandle}>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <label
                    for="handle"
                    htmlFor="handle"
                    className="block text-sm font-medium leading-6 text-gray-700"
                  >
                    Type your handle
                  </label>
                </div>
                <div className="mt-2 flex justify-center">
                  <input
                    id="handle"
                    placeholder="ex: naruto"
                    value={handle}
                    onChange={handleOnChange}
                    type="text"
                    required
                    className="block w-full rounded-md border border-gray-400 px-3 py-2 ring-offset-gray-200 focus-visible:ring-1 sm:text-sm focus:outline-none focus-visible:ring-offset-2 sm:leading-6"
                  />
                </div>
                {handleTaken && (
                  <small className="text-red-500">
                    {handle} is not available
                  </small>
                )}
              </div>
            </div>

            <div className="mt-4">
              <button
                disabled={isLoading}
                onClick={handleAddHandle}
                className="flex w-full justify-center rounded-md bg-slate-900 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
              >
                {isLoading ? (
                  <>
                    <div className="flex justify-center w-[100px]">
                      <TinyLoader color="white" size={20} stroke={2} />
                    </div>
                  </>
                ) : (
                  <span className="text-md">Submit 🚀</span>
                )}
              </button>
            </div>
            <div className="w-full hidden justify-center h-full lg:flex">
              <Confetti active={isExploding} config={config} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Onboarding;
