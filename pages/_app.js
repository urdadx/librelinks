import '../styles/globals.css';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import NProgress from '@/components/utils/nprogress';
import { Provider } from 'react-wrap-balancer';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const [state, setState] = useState({
    isRouteChanging: false,
    loadingKey: 0,
  });

  // query client
  const [queryClient] = useState(() => new QueryClient());

  // NProgress configuration
  useEffect(() => {
    const handleRouteChangeStart = () => {
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: true,
        loadingKey: prevState.loadingKey ^ 1,
      }));
    };

    const handleRouteChangeEnd = () => {
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: false,
      }));
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeEnd);
    router.events.on('routeChangeError', handleRouteChangeEnd);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeEnd);
      router.events.off('routeChangeError', handleRouteChangeEnd);
    };
  }, [router.events]);

  return (
    <>
      <NProgress
        isRouteChanging={state.isRouteChanging}
        key={state.loadingKey}
      />
      <Analytics />
      <QueryClientProvider client={queryClient}>
        <Toaster toastOptions={{ duration: 2500 }} position="bottom-center" />
        <SessionProvider session={pageProps.session}>
          <Provider>
            <Component {...pageProps} />
          </Provider>
        </SessionProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
