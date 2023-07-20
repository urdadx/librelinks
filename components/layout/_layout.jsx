import { useRouter } from "next/router";
import Preview from "../shared/profile-preview/preview";
import PreviewBtn from "../shared/profile-preview/preview-btn";
import Navbar from "./navbar/navbar";

const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <>
      <Navbar showName={false} isHomePage={false} />
      <main className="bg-[#F2F4F7] flex flex-row h-screen">
        {children}
        {router.pathname != "/admin/analytics" && (
          <div className="hidden lg:my-auto lg:block lg:w-2/5 pl-4 overflow-hidden">
            <Preview />
          </div>
        )}
        <PreviewBtn />
      </main>
    </>
  );
};

export default Layout;
