import Link from "next/link";
import { FiGithub } from "react-icons/fi";
import axios from "axios";
import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import Navbar from "@/components/layout/navbar/navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Home = () => {
  const [starCount, setStarCount] = useState(1);
  const session = useSession();
  const router = useRouter();

  const fetchStarCount = () => {
    axios
      .get("https://api.github.com/repos/urdadx/librelinks", {
        headers: {},
      })
      .then((res) => {
        setStarCount(res.data.stargazers_count);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // fetch on load once
  useEffect(() => {
    fetchStarCount();
  }, []);


  return (
    <>
      <Navbar showName={true} />

      <div className="flex items-center justify-center h-auto min-h-[90vh] lg:h-[90vh] xl:h-[90vh] w-full flex-col lg:flex-row xl:flex-row overflow-hidden">
        <div className="w-full lg:w-6/12 xl:w-6/12 h-auto lg:h-full xl:h-full flex items-start justify-center flex-col pl-4 lg:pl-10 xl:pl-10 relative z-10 py-4 lg:py-0 xl:py-0 overflow-hidden">
          <h3 className="text-sm lg:text-base xl:text-base bg-text-gradient font-bold mb-2 uppercase tracking-wider">
            Highly Customizable. Open Source. Private
          </h3>
          <h1 className="font-bold text-3xl lg:text-[2.75rem] xl:text-[2.75rem] lg:leading-[3.7rem]">
            {siteConfig.description}
          </h1>
          <p className="text-light text-slate-600 my-2 mt-3 text-md lg:text-md xl:text-md">
            You are in charge of your own data and customizations. No
            third-parties.
          </p>
          <div className="flex mt-5">
            <Link href="/app">
              <div>
                <div className="!p-0 !w-auto !h-auto !m-auto">
                  <div className="bg-slate-900 text-white px-5 py-[10px] lg:text-lg xl:text-lg capitalize rounded-md font-semibold flex items-center justify-center hover:bg-slate-800">
                    Try Now! 🔥
                  </div>
                </div>
              </div>
            </Link>
            <a
              className="!p-0 !w-auto !h-auto !m-auto !ml-1"
              href="https://github.com/urdadx/librelinks"
              target="_blank"
              rel="noreferrer"
            >
              <div className="border-2 border-slate-900 text-slate-900 px-4 py-[8px] lg:text-lg xl:text-lg capitalize rounded-md font-semibold flex items-center justify-center">
                <FiGithub className="text-lg mr-1" />
                Stars <span className="ml-1">{starCount}</span>
              </div>
            </a>
          </div>
        </div>
        <div className="w-full lg:w-6/12 xl:w-6/12 h-auto lg:h-full xl:h-full flex items-center justify-center flex-col relative pb-10 lg:pb-0 xl:pb-0">
          <div className="h-full w-full flex items-center justify-center">
            <div className="border-2 border-slate-500 p-4 rounded-md">
              <img
                src="/assets/screenshot_home.png"
                alt="screenshot"
                className="w-full lg:w-[600px] xl:w-[600px] opacity-50 lg:opacity-100 xl:opacity-100"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
