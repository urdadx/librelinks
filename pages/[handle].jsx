/* eslint-disable @next/next/no-img-element */
import LinkCard from "@/components/core/user-profile/links-card";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import useUser from "@/hooks/useUser";
import Loader from "@/components/utils/loading-spinner";
import NotFound from "@/components/utils/not-found";
import useLinks from "@/hooks/useLinks";
import Head from "next/head";

const ProfilePage = () => {
  const router = useRouter();
  const { handle } = router.query;

  const { data: fetchedUser, isLoading: isUserLoading, isFetching: isUserFetching } = useUser(handle);

  const { data: userLinks, isFetching: isLinksFetching} = useLinks(fetchedUser?.id);

  const queryClient = useQueryClient();
  const [, setIsDataLoaded] = useState(false);

  const mutation = useMutation(
    async id => {
      await axios.patch(`/api/analytics/clicks/${id}`);
    },
    {
      onError: error => {
        toast.error(
          (error.response && error.response.data.message) || "An error occurred"
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["links", fetchedUser?.id] });
        queryClient.invalidateQueries({ queryKey: ["users", fetchedUser?.id] });
      },
    }
  );

  const handleRegisterClick = async id => {
    await mutation.mutateAsync(id);
  };

  useEffect(() => {
      window.addEventListener('message', () => {
				queryClient.invalidateQueries({ queryKey: ["links"] });
        queryClient.invalidateQueries({ queryKey: ["users"] });
      })

      return () => {
        window.removeEventListener("message", () => {
  				queryClient.invalidateQueries({ queryKey: ["links"] });
          queryClient.invalidateQueries({ queryKey: ["users"] });
        })
      }
  }, [])

  useEffect(() => {
    if (fetchedUser && userLinks) {
      setIsDataLoaded(true);
    }
  }, [fetchedUser, userLinks]);

  useEffect(() => {
    const trackVisit = async () => {
      try {
        await axios.post(`/api/analytics/views/${fetchedUser?.id}`);
      } catch (err) {}
    };
    trackVisit();
  }, [fetchedUser]);

  if (isUserLoading) {
    return <Loader message={"Loading..."} bgColor="black" textColor="black" />;
  }

  if (!fetchedUser?.id) {
    return <NotFound />;
  }

  const buttonStyle = fetchedUser?.buttonStyle;
  const theme = {
    primary: fetchedUser?.themePalette.palette[0],
    secondary: fetchedUser?.themePalette.palette[1],
    accent: fetchedUser?.themePalette.palette[2],
    neutral: fetchedUser?.themePalette.palette[3],
  };

  return (
    <>
      <Head>
        <script
          defer
          src="https://unpkg.com/@tinybirdco/flock.js"
          data-host="https://api.tinybird.co"
          data-token="p.eyJ1IjogIjljZTA3ZWY3LTQwMWEtNDI4Ny04ZTQ0LTkzMDhjODY4YTJmNCIsICJpZCI6ICJjZWUzYjRmZS0zNTk1LTQzNjQtODAyOC1iYzZhYTJhZGZiYmUifQ.5GU8VusS9gjxLkZ-2UBcYiC6w5hxfTGT_0ij681VWos"
        />
      </Head>
      <section
        style={{ background: theme.primary }}
        className="h-[100vh] w-[100vw] no-scrollbar overflow-auto"
      >
        <div className="flex items-center w-full mt-4 flex-col mx-auto max-w-3xl justify-center px-8 lg:mt-16">
          {(isLinksFetching || isUserFetching ) && <div className="absolute -top-5 left-2">
             <Loader width={15} height={15} bgColor={"white"}/>
          </div>}
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
          {userLinks?.map(({ id, ...link }) => (
            <LinkCard
              buttonStyle={buttonStyle}
              theme={theme}
              id={id}
              key={id}
              {...link}
              registerClicks={() => handleRegisterClick(id)}
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

          <div className="h-[40px] my-10">
            {/* <footer>
							<p className="text-sm text-black text-semibold text-center ">
								Made by{" "}
								<Link
									className="font-semibold"
									style={{ color: theme.accent }}
									target="_blank"
									href="https://twitter.com/NerdyProgramme2">
									@urdadx
								</Link>{" "}
							</p>
						</footer> */}
          </div>
        </div>
      </section>
      {/* // Footer */}
    </>
  );
};

export default ProfilePage;
