import Head from 'next/head';

export const metadata = {
  title: 'HYPME!',
  description: '',
};

const Spotify = () => {
  return (
    <>
      <Head>
        <meta httpEquiv="refresh" content="0; URL=https://open.spotify.com/playlist/2dN9BfIi1ztGcOPOpwoZqG?si=608f78876da5463c" />
      </Head>
    </>
  );
};

export default Spotify;
