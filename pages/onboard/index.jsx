import { useCallback, useState } from "react";
import Link from "next/link";
import { Shuffle } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { TinyLoader } from "@/components/utils/tiny-loader";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import ConfettiExplosion from "confetti-explosion-react";

const Onboard = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [handle, setHandle] = useState("");
  const [handleTaken, setHandleTaken] = useState(false);
  const [isExploding, setIsExploding] = useState(false);

  const router = useRouter();

  const handleAddHandle = useCallback(async () => {
    setIsLoading(true);
    if (!handle || handle.trim() === "") {
      toast.error("Please fill the form");
      setIsLoading(false);
      return;
    }
    try {
      const response = await axios.patch("/api/edit", { handle: handle });
      setIsLoading(false);
      if (response.status === 200) {
        setIsExploding(true);
        toast.success(`${handle} is yours 🎉`);
        setTimeout(() => {
          router.push("/admin");
        }, 1500)
      }
    } catch (error) {
      setHandleTaken(true)
      setTimeout(() => {
        setHandleTaken(false)
      }, 2000)
      setIsLoading(false);
    }
  }, [handle, router]);

  const autoGenerateName = () => {
    const generatedName = nanoid(7);
    setHandle(generatedName);
  };

  const handleOnChange = (event) => {
    setHandle(event.target.value);
    setHandleTaken(false);
  };
  return (
    <>
      <div
        className="absolute inset-0 bg-[url(../public/grid.svg)] bg-center 
        [mask-image:linear-gradient(180deg,rgba(255,255,255,0))]"
      />
      <div className="absolute w-full flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="mx-auto h-[30px] w-[30px] bg-slate-900 rounded-full" />
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Claim your unique handle ✨
          </h2>
        </div>
        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <div class="flex items-center justify-between">
                <label
                  for="password"
                  class="block text-sm font-medium leading-6 text-gray-700"
                >
                  Claim handle
                </label>
                <div className="text-sm">
                  <Link
                    href="#"
                    onClick={autoGenerateName}
                    className="font-semibold flex items-center gap-1 text-slate-600 hover:text-slate-500"
                  >
                    <span>Autogenerate</span>
                    <Shuffle size={15} />
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  placeholder="@urdad"
                  value={handle}
                  onChange={handleOnChange}
                  type="text"
                  required
                  className="block w-full rounded-md border border-gray-400 px-3 py-2 ring-offset-gray-200 focus-visible:ring-1 sm:text-sm focus:outline-none focus-visible:ring-offset-2 sm:leading-6"
                />
              </div>
              {handleTaken && (
                <small className="text-red-500">{handle} is not available</small>
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
          <div className="w-full hidden justify-center h-full mx-auto lg:flex">
            {isExploding && <ConfettiExplosion />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Onboard;
