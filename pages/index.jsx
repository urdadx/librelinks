/* eslint-disable @next/next/no-img-element */
import GithubStar from '@/components/utils/github-star';
import { GithubIcon, GlobeIcon, TwitterIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { useSession } from '@/lib/auth-client';
import { siteConfig } from '@/config/site';

export const metadata = {
  title: 'Librelinks',
  description: siteConfig.description,
};

const Home = () => {
  const { data: session } = useSession();
  const isAuthenticated = Boolean(session?.user);

  const socialLinks = [
    { href: 'https://x.com/NerdyProgramme2', icon: TwitterIcon, label: 'twitter logo' },
    { href: 'https://github.com/urdadx', icon: GithubIcon, label: 'github logo' },
    { href: 'https://urdadx.com/', icon: GlobeIcon, label: 'website logo' },
  ];

  return (
    <>
      <Head>
        <title>{siteConfig.title}</title>
        <meta name="description" content={siteConfig.description} />
        <link rel="canonical" href={siteConfig.url} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteConfig.url} />
        <meta property="og:site_name" content="Librelinks" />
        <meta property="og:title" content={siteConfig.title} />
        <meta property="og:description" content={siteConfig.description} />
        <meta property="og:image" content={siteConfig.ogImage} />
        <meta property="og:image:secure_url" content={siteConfig.ogImage} />
        <meta property="og:image:alt" content={siteConfig.description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={siteConfig.twitterHandle} />
        <meta name="twitter:creator" content={siteConfig.twitterHandle} />
        <meta property="twitter:domain" content="links.urdadx.com" />
        <meta property="twitter:url" content={siteConfig.url} />
        <meta name="twitter:title" content={siteConfig.title} />
        <meta name="twitter:description" content={siteConfig.description} />
        <meta name="twitter:image" content={siteConfig.ogImage} />
        <meta data-rh="true" name="twitter:image:alt" content={siteConfig.description} />
      </Head>

      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        <div className="relative overflow-hidden pt-6 pb-16 sm:pb-24">
          <div className="px-4 mx-auto max-w-7xl sm:px-6">
            <nav className="relative flex items-center justify-between" aria-label="Global">
              <Link className="flex items-center gap-2 font-bold text-xl" href="/">
                Librelinks
              </Link>
              <Link
                className="inline-flex items-center justify-center gap-2 px-4 text-sm font-semibold text-white transition-colors bg-slate-900 border rounded-3xl w-28 h-9 hover:bg-slate-700"
                href="/admin"
              >
                {isAuthenticated ? 'Admin' : 'Login'}
              </Link>
            </nav>
          </div>

          <div className="px-4 mx-auto mt-24 max-w-7xl sm:mt-16 sm:px-6 flex flex-col items-center text-center">
            <a
              className="inline-flex items-center gap-2 px-4 py-4 mb-6 text-sm text-gray-500 transition-colors border bg-gray-50 rounded-3xl w-[180px] h-[35px] justify-center hover:bg-gray-100"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/urdadx/librelinks"
            >
              <GithubStar /> Star us on Github
            </a>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Transform your online presence</span>
              <span className="hero-title block">with one simple link</span>
            </h1>
            <p className="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Librelinks is an opensource link in bio tool that helps you easily manage your links, transforming your online presence.
            </p>

            <Link legacyBehavior href="/register">
              <a className="mt-6 inline-flex items-center justify-center px-4 py-2 text-lg font-medium text-white transition-all rounded-xl w-[190px] h-[50px] shadow hover:shadow-lg bg-[linear-gradient(60deg,#f79533,#f37055,#ef4e7b,#1098ad,#07b39b,#6fba82)] bg-[length:300%_300%] hover:brightness-95">
                Get started
              </a>
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex flex-col" aria-hidden="true">
            <div className="flex-1" />
            <div className="flex-1 w-full bg-slate-900" />
          </div>
          <div className="px-4 mx-auto max-w-7xl sm:px-6">
            <Image
              className="relative rounded-lg shadow-lg"
              src="/assets/new_shot.png"
              alt="App screenshot"
              height={700}
              width={1200}
            />
          </div>
        </div>

        <div className="bg-slate-900">
          <div className="px-4 py-16 mx-auto max-w-7xl sm:py-24 sm:px-6 lg:px-8">
            <h2 className="text-lg font-semibold tracking-wide text-center text-gray-400">
              Made by{' '}
              <a className="hover:text-emerald-500" target="_blank" rel="noopener noreferrer" href="https://twitter.com/NerdyProgramme2">
                @urdadx
              </a>
            </h2>
            <div className="flex items-center gap-4 justify-center mt-4">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Icon color="white" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
