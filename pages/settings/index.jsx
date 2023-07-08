import { useCallback, useEffect, useState } from "react";
import Layout from "../../components/layout/_layout";
import Preview from "../../components/shared/profile-preview/preview";
import PreviewBtn from "../../components/shared/profile-preview/preview-btn";
import useCurrentUser from "@/hooks/useCurrentUser";
import axios from "axios";
import toast from "react-hot-toast";
import * as Dialog from "@radix-ui/react-dialog";
import UploadModal from "@/components/shared/modals/upload-modal";
import { TinyLoader } from "@/components/utils/tiny-loader";
import { useRouter } from "next/router";

const settings = () => {  

  const { data: currentUser } = useCurrentUser();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [handle, setHandle] = useState("")

  useEffect(() => {
    setUsername(currentUser?.name);
    setBio(currentUser?.bio);
    setImage(currentUser?.image);
    setHandle(currentUser?.handle);
  }, [currentUser?.name, currentUser?.bio, currentUser?.image, currentUser?.handle]);

  const handleSubmit = useCallback(async () => {
    toast.promise(
      axios.patch("/api/edit", { bio, username, image, handle }),
      {
        loading: "Applying changes",
        success: "Changes applied",
        error: "An error occurred",
      }
    );
  }, [username, bio, image]);

  const handleDeleteUser = useCallback(async () => {
    await toast.promise(
      axios.delete("/api/edit"),
      {
        loading: "Deleting your account",
        success: "Account deleted",
        error: "An error occurred",
      }
    );
    router.push("/register");
  }, [currentUser?.id]);

  return (
    <>
      <Layout>
        <div className="w-full lg:w-3/5 pl-4 pr-4 border-r overflow-scroll">
          <div className="max-w-[690px] mx-auto my-10">
            <h3 className="text-xl font-semibold">Profile</h3>
            <div className="mt-4 rounded-2xl border bg-white p-lg w-full h-auto pb-10">
              <div className="flex flex-col lg:flex-row gap-x-6 p-10">
                <div className="w-[100px] pb-6 h-[100px] rounded-full flex items-center mx-auto">
                  {currentUser ? (
                    <img
                      loading="lazy"
                      className="object-cover rounded-full lg:border-none"
                      alt="user_profile_pic"
                      src={currentUser?.image}
                    />
                  ) : (
                    <TinyLoader color="black" stroke={1} size={100} />
                  )}
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  <div className="relative overflow-hidden">
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <button className="relative w-full lg:w-[490px] h-[45px] border rounded-3xl border-[#000] outline-none text-white bg-slate-900 p-2 hover:bg-slate-700">
                          Pick an image
                        </button>
                      </Dialog.Trigger>
                      <UploadModal
                        value={image}
                        onChange={(image) => setImage(image)}
                        submit={handleSubmit}
                      />
                    </Dialog.Root>
                  </div>
                  <button className="w-full lg:w-[490px] h-[45px] border border-[#aaa] 
                      outline-none font-semibold text-slate-900 bg-white p-2 rounded-3xl hover:bg-gray-100">
                    Remove
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-4 max-w-[640px] mx-auto px-4">
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={handleSubmit}
                  placeholder="@Username"
                  className="outline-none w-full p-4 h-[50px] rounded-lg border-2 bg-gray-100 text-black focus:border-slate-900"
                />

                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  onBlur={handleSubmit}
                  placeholder="@Bio"
                  className="outline-none w-full p-4 h-[120px] rounded-lg border-2
                     bg-gray-100 text-black focus:border-slate-900"
                />
              </div>
            </div>
          </div>

          <div className="max-w-[690px] mx-auto my-10">
            <h3 className="text-xl font-semibold mb-4">Danger Zone</h3>
            <div className="w-full h-auto bg-white rounded-lg p-6">
              <button
                onClick={handleDeleteUser}
                className="border-none w-full lg:w-[200px] rounded-lg h-auto p-3
                 text-white bg-red-600 hover:bg-red-500"
              >
                Delete Account
              </button>
            </div>
          </div>

          <div className="h-[60px]"></div>
        </div>

        <div className="hidden lg:block lg:my-auto lg:w-2/5 pl-4 overflow-hidden">
          <Preview />
        </div>

        <PreviewBtn />
      </Layout>
    </>
  );
};

export default settings;
