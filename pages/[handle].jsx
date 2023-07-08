import { useEffect, useState } from "react";
import LinkCard from "@/components/core/user-profile/links-card";
import { useRouter } from "next/router";
import Loader from "@/components/utils/loading-spinner";
import useUser from "@/hooks/useUser";
import axios from "axios";
import NotFound from "@/components/utils/not-found";

const ProfilePage = () => {
  
  const router = useRouter();
  const { handle } = router.query;
  const { data: fetchedUser, isLoading } = useUser(handle);
  const [userLinks, setUserLinks] = useState([]);

  useEffect(() => {
    setUserLinks(fetchedUser?.links);
  }, [isLoading, fetchedUser]);

  if (isLoading) {
    return <Loader bgColor={"black"} textColor={"black"} />;
  }

  if (!fetchedUser?.id) {
    return <NotFound />
  }

  const buttonStyle = fetchedUser?.buttonStyle;

  const theme = {
    primary: fetchedUser?.themePalette.palette[0],
    secondary: fetchedUser?.themePalette.palette[1],
    accent: fetchedUser?.themePalette.palette[2],
    neutral: fetchedUser?.themePalette.palette[3],
  };

  const handleRegisterClick = async (id) => {
    try {
      await axios.patch(`/api/analytics/clicks/${id}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <section
        style={{ background: theme.primary }}
        className="h-[100vh] w-[100vw] no-scrollbar overflow-auto"
      >
        <div className="flex items-center w-full mt-4 flex-col mx-auto max-w-3xl justify-center px-8 lg:mt-16">
          <img
            loading="lazy"
            className="rounded-full w-[70px] h-[70px] lg:w-[96px] lg:h-[96px]"
            alt={fetchedUser?.name}
            src={fetchedUser?.image}
          />
          <p
            style={{ color: theme.accent }}
            className="font-bold text-white text-center text-sm mt-4 mb-1 lg:text-xl lg:mt-4 lg:mb-1"
          >
            {fetchedUser?.name}
          </p>
          {fetchedUser?.bio && (
            <p
              style={{ color: theme.accent }}
              className="w-[150px] truncate text-center text-sm mt-1 mb-4 lg:text-xl lg:mt-4 lg:mb-8 lg:w-[500px]"
            >
              {fetchedUser?.bio}
            </p>
          )}
          {userLinks?.map((link) => (
            <LinkCard
              buttonStyle={buttonStyle}
              theme={theme}
              id={link.id}
              key={link.id}
              {...link}
              registerClicks={() => handleRegisterClick(link.id)}
            />
          ))}
          {userLinks?.length === 0 && (
            <div className="flex justify-center">
              <h3
                style={{ color: theme.neutral }}
                className="pt-8 text-md text-white font-semibold lg:text-2xl"
              >
                Hello World 🚀
              </h3>
            </div>
          )}
          <div className="h-[60px]"></div>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
