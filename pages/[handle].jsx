/* eslint-disable @next/next/no-img-element */
import LinkCard from '@/components/core/user-profile/links-card';
import * as Avatar from '@radix-ui/react-avatar';
import * as Dialog from '@radix-ui/react-dialog';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import useUser from '@/hooks/useUser';
import Loader from '@/components/utils/loading-spinner';
import NotFound from '@/components/utils/not-found';
import useLinks from '@/hooks/useLinks';
import { SocialCards } from '@/components/core/user-profile/social-cards';
import Head from 'next/head';
import { Drawer } from 'vaul';
import useMediaQuery from '@/hooks/use-media-query';

const LOCAL_LOCATION_FALLBACK = {
  countryCode: 'GH',
  city: 'Accra',
};

const DEFAULT_MADE_WITH_URL = 'https://urdadx.com/';

const ProfilePage = () => {
  const { query } = useRouter();
  const { handle } = query;
  const normalizedHandle =
    typeof handle === 'string' ? handle.trim().toLowerCase() : undefined;
  const [previewUserOverride, setPreviewUserOverride] = useState(null);
  const [isBioDrawerOpen, setIsBioDrawerOpen] = useState(false);
  const [isBioTruncated, setIsBioTruncated] = useState(false);
  const bioRef = useRef(null);

  const { isMobile } = useMediaQuery();

  const {
    data: fetchedUser,
    isLoading: isUserLoading,
    isFetching: isUserFetching,
  } = useUser(normalizedHandle);

  const { data: userLinks, isFetching: isLinksFetching } = useLinks(
    fetchedUser?.id
  );

  const queryClient = useQueryClient();
  const [, setIsDataLoaded] = useState(false);
  const sourceBio = previewUserOverride?.bio ?? fetchedUser?.bio ?? '';

  const mutation = useMutation(
    async (id) => {
      await axios.patch(`/api/analytics/clicks/${id}`);
    },
    {
      onError: (error) => {
        toast.error(
          (error.response && error.response.data.message) || 'An error occurred'
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['links', fetchedUser?.id] });
      },
    }
  );

  const handleRegisterClick = async (id) => {
    await mutation.mutateAsync(id);
  };

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === 'preview-update' && event.data.payload) {
        setPreviewUserOverride((currentOverride) => ({
          ...currentOverride,
          ...event.data.payload,
        }));
      }

      queryClient.invalidateQueries({ queryKey: ['links'] });
      queryClient.invalidateQueries({ queryKey: ['user', normalizedHandle] });
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [normalizedHandle, queryClient]);

  useEffect(() => {
    if (fetchedUser && userLinks) {
      setIsDataLoaded(true);
    }
  }, [fetchedUser, userLinks]);

  useEffect(() => {
    if (!fetchedUser) {
      return;
    }

    setPreviewUserOverride(null);
  }, [fetchedUser]);

  useEffect(() => {
    if (!normalizedHandle || query.isIframe) {
      return;
    }

    const trackingKey = `profile-view:${normalizedHandle}`;
    if (window.sessionStorage.getItem(trackingKey)) {
      return;
    }

    let isCancelled = false;

    const trackView = async () => {
      try {
        await axios.post(
          `/api/users/${normalizedHandle}`,
          getBrowserTrackingPayload()
        );
        if (!isCancelled) {
          window.sessionStorage.setItem(trackingKey, 'tracked');
        }
      } catch {
      }
    };

    trackView();

    return () => {
      isCancelled = true;
    };
  }, [normalizedHandle, query.isIframe]);

  useEffect(() => {
    const checkBioTruncation = () => {
      if (!bioRef.current || !sourceBio) {
        setIsBioTruncated(false);
        return;
      }

      const element = bioRef.current;
      setIsBioTruncated(element.scrollWidth > element.clientWidth);
    };

    checkBioTruncation();
    window.addEventListener('resize', checkBioTruncation);

    return () => {
      window.removeEventListener('resize', checkBioTruncation);
    };
  }, [sourceBio]);

  if (isUserLoading) {
    return <Loader message={'Loading...'} bgColor="black" textColor="black" />;
  }

  if (!fetchedUser?.id) {
    return <NotFound />;
  }

  const displayUser = previewUserOverride
    ? {
        ...fetchedUser,
        ...previewUserOverride,
      }
    : fetchedUser;

  const buttonStyle = displayUser?.buttonStyle;
  const madeWithUrl = getCurrentApexUrl();
  const theme = {
    primary: displayUser?.themePalette.palette[0],
    secondary: displayUser?.themePalette.palette[1],
    accent: displayUser?.themePalette.palette[2],
    neutral: displayUser?.themePalette.palette[3],
  };

  return (
    <>
      <Head>
        <title> @{displayUser?.handle || normalizedHandle} | Librelinks</title>
      </Head>
      <section
        style={{ background: theme.primary }}
        className="h-[100vh] w-[100vw] no-scrollbar overflow-auto"
      >
        <div className="flex items-center w-full mt-4 flex-col mx-auto max-w-3xl justify-center px-8 lg:mt-16">
          {(isLinksFetching || isUserFetching) && (
            <div className="absolute -top-5 left-2">
              <Loader
                strokeWidth={7}
                width={15}
                height={15}
                bgColor={theme.accent}
              />
            </div>
          )}
          <Avatar.Root
            className="inline-flex h-[70px] w-[70px] border-2 border-blue-300
						items-center justify-center overflow-hidden rounded-full align-middle lg:w-[96px] lg:h-[96px]"
          >
            <Avatar.Image
              className="h-full w-full rounded-[inherit] object-cover"
              src={displayUser?.image}
              referrerPolicy="no-referrer"
              alt="avatar"
            />
            <Avatar.Fallback
              className="leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
              delayMs={100}
            >
              @
            </Avatar.Fallback>
          </Avatar.Root>
          <p
            style={{ color: theme.accent }}
            className="font-bold text-white text-center text-sm mt-4 mb-2 lg:text-xl lg:mt-4"
          >
            {displayUser?.name}
          </p>
          {displayUser?.bio && (
            <>
              <p
                ref={bioRef}
                style={{ color: theme.accent }}
                className="w-[150px] truncate text-center text-sm mt-1 lg:text-xl lg:w-[600px]"
              >
                {displayUser?.bio}
              </p>

              {isBioTruncated &&
                (isMobile ? (
                  <Drawer.Root
                    open={isBioDrawerOpen}
                    onOpenChange={setIsBioDrawerOpen}
                    shouldScaleBackground
                  >
                    <Drawer.Trigger asChild>
                      <button
                        style={{ color: theme.accent }}
                        className="mb-4 text-xs underline underline-offset-4 lg:text-sm"
                        type="button"
                      >
                        View full bio
                      </button>
                    </Drawer.Trigger>
                    <Drawer.Portal>
                      <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                      <Drawer.Content className="bg-white p-6 flex flex-col rounded-t-2xl h-[45%] mt-24 fixed bottom-0 left-0 right-0">
                        <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-6" />
                        <h3 className="text-lg font-semibold text-slate-900 mb-3">
                          Bio
                        </h3>
                        <p className="text-slate-700 whitespace-pre-wrap break-words overflow-y-auto">
                          {displayUser?.bio}
                        </p>
                      </Drawer.Content>
                    </Drawer.Portal>
                  </Drawer.Root>
                ) : (
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <button
                        style={{ color: theme.accent }}
                        className="mb-4 text-xs underline underline-offset-4 lg:text-sm"
                        type="button"
                      >
                        View full bio
                      </button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                      <Dialog.Overlay className="fixed inset-0 backdrop-blur-sm bg-gray-800 bg-opacity-50 sm:w-full" />
                      <Dialog.Content className="contentShow fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 sm:p-8 lg:max-w-3xl w-[350px] sm:w-[500px] shadow-lg md:max-w-lg max-md:max-w-lg focus:outline-none">
                        <Dialog.Title className="text-lg font-semibold text-slate-900 mb-3">
                          Bio
                        </Dialog.Title>
                        <p className="text-slate-700 whitespace-pre-wrap break-words max-h-[300px] overflow-y-auto">
                          {displayUser?.bio}
                        </p>
                      </Dialog.Content>
                    </Dialog.Portal>
                  </Dialog.Root>
                ))}
            </>
          )}
          <div className="min-w-max flex flex-wrap gap-2 mb-8 lg:w-fit lg:gap-4">
            {userLinks
              ?.filter((link) => link.isSocial && !link.archived)
              .map(({ id, title, url }) => {
                return (
                  <SocialCards
                    key={title}
                    title={title}
                    url={url}
                    color={theme.accent}
                    registerClicks={() => handleRegisterClick(id)}
                  />
                );
              })}
          </div>
          {userLinks
            ?.filter((link) => !link.isSocial)
            .map(({ id, ...link }) => (
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
        </div>
        <div className="my-10 lg:my-24" />
        {userLinks?.length > 0 ? (
          <footer className="relative left-1/2 bottom-0 transform -translate-x-1/2 w-[200px]">
            <p
              style={{ color: theme.accent }}
              className="text-sm text-semibold text-center w lg:text-lg"
            >
              Made with{' '}
              <Link
                className="font-semibold"
                target="_blank"
                href={madeWithUrl}
              >
                Librelinks
              </Link>
            </p>
          </footer>
        ) : (
          ''
        )}
      </section>
    </>
  );
};

function getBrowserTrackingPayload() {
  const hostname = window.location.hostname;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const cityFromTimezone = timezone?.split('/').pop()?.replace(/_/g, ' ');
  const isTouchDevice = navigator.maxTouchPoints > 0;
  const userAgent = navigator.userAgent.toLowerCase();

  let browserDevice = 'desktop';
  if (/ipad|tablet/.test(userAgent)) {
    browserDevice = 'tablet';
  } else if (/iphone|android.+mobile|mobile/.test(userAgent) || isTouchDevice) {
    browserDevice = 'mobile';
  }

  const browserLocation = {
    hostname,
    city: cityFromTimezone || LOCAL_LOCATION_FALLBACK.city,
    countryCode:
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '::1' ||
      hostname.endsWith('.local')
        ? LOCAL_LOCATION_FALLBACK.countryCode
        : undefined,
  };

  return {
    browserDevice,
    browserLocation,
    browserReferrer: document.referrer,
  };
}

function getCurrentApexUrl() {
  if (typeof window === 'undefined') {
    return DEFAULT_MADE_WITH_URL;
  }

  const { protocol, hostname } = window.location;

  if (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '::1' ||
    hostname.endsWith('.local')
  ) {
    return `${protocol}//${hostname}/`;
  }

  const parts = hostname.split('.');
  const apexHostname = parts.length > 2 ? parts.slice(-2).join('.') : hostname;

  return `${protocol}//${apexHostname}/`;
}

export default ProfilePage;

export async function getServerSideProps(context) {
  const incomingHandle = context?.params?.handle;

  if (typeof incomingHandle !== 'string') {
    return { props: {} };
  }

  const canonicalHandle = incomingHandle.trim().toLowerCase();

  if (incomingHandle !== canonicalHandle) {
    const query = { ...context.query };
    delete query.handle;
    const searchParams = new URLSearchParams(query).toString();

    return {
      redirect: {
        destination: `/${canonicalHandle}${searchParams ? `?${searchParams}` : ''}`,
        permanent: true,
      },
    };
  }

  return { props: {} };
}
