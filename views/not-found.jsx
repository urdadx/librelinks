import Head from 'next/head';
import NotFound from '@/components/utils/not-found';

const NotFoundPage = () => {
  return (
    <>
      <Head>
        <title>Page not found | Librelinks</title>
        <meta name="robots" content="noindex" />
      </Head>
      <NotFound />
    </>
  );
};

export default NotFoundPage;
