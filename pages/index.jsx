/* eslint-disable @next/next/no-img-element */
import GithubStar from '@/components/utils/github-star';
import { GithubIcon, GlobeIcon, TwitterIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { useSession } from 'next-auth/react';

export const metadata = {
  title: 'HYPME!',
  description:
    '',
};

const Home = () => {
  const session = useSession();
  const isAuthenticated = session.status === 'authenticated' ? true : false;

  return (
    <>
      <Head>
        <meta http-equiv='refresh' content='0; URL=https://www.instagram.com/merecord_/' />
      </Head>
    </>
  );
};

export default Home;
