/* eslint-disable @next/next/no-img-element */
import GithubStar from '@/components/utils/github-star';
import { GithubIcon, GlobeIcon, TwitterIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { useSession } from 'next-auth/react';

export const metadata = {
  title: 'Librelinks',
  description:
    'Librelinks is an opensource link in bio tool that helps you easily manage your links, transforming your online presence.',
};

const Home = () => {
  const session = useSession();
  const isAuthenticated = session.status === 'authenticated';

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css?family=Manrope:700|Manrope:400');

        :root {
          --text: hsl(0, 0%, 99%);
          --textDim: hsl(0, 0%, 60%);
          --background: hsl(0, 0%, 7%);
          --primary: hsl(155, 100%, 65%);
          --primaryBg: hsla(155, 100%, 65%, 1%);
          --primaryHi: hsla(155, 100%, 75%, 25%);
          --primaryFg: hsl(155, 100%, 85%);
          --secondary: hsl(156, 51%, 14%);
          --secondaryFg: hsl(156, 51%, 75%);
          --secondaryBg: hsla(156, 51%, 14%, 5%);
          --secondaryHi: hsla(156, 51%, 30%, 50%);
          --accent: hsl(155, 100%, 94%);
          --accentBg: hsla(155, 100%, 94%, 1%);
          --accentHi: hsla(155, 100%, 100%, 25%);
        }

        body {
          font-family: 'Manrope';
          font-weight: 400;
          background-color: var(--background);
          color: var(--text);
          padding: 0 10%;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100vh;
          overflow: hidden;
        }

        nav {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 2rem;
          color: var(--textDim);
          width: 100%;
          box-sizing: border-box;
          z-index: 9999;
        }

        .menu:hover {
          color: var(--text);
          cursor: pointer;
        }

        .sitename {
          font-weight: bold;
        }

        .grid {
          position: absolute;
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          align-self: center;
          z-index: -1;
        }

        .grid-svg {
          height: 80%;
          width: 80%;
          position: relative;
          z-index: 1;
        }

        .blur {
          height: 12rem;
          width: 12rem;
          background-color: var(--primary);
          filter: blur(100px);
          border-radius: 100px;
          z-index: 0;
          position: absolute;
        }

        .title {
          font-size: 10rem;
          font-weight: 700;
          letter-spacing: -0.6rem;
          display: flex;
          flex-direction: column;
          position: absolute;
          justify-content: center;
          align-self: center;
          height: 100%;
          z-index: 1000;
        }

        .title > p {
          margin: 0;
          line-height: 10rem;
          width: auto;
        }

        .title > p:nth-child(1) {
          align-self: flex-start;
        }

        .title > p:nth-child(3) {
          align-self: flex-end;
        }

        strong {
          color: var(--primary);
        }

        .title > p:nth-child(2) {
          align-self: flex-end;
        }

        .material-icons {
          display: none;
          fill: var(--text);
        }

        .button {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: absolute;
          text-decoration: none;
          color: inherit;
          cursor: pointer;
          height: 50px;
          width: 160px;
          z-index: 9999;
        }

        button {
          height: 50px;
          width: 160px;
          clip-path: path('M 0 25 C 0 -5, -5 0, 80 0 S 160 -5, 160 25, 165 50 80 50, 0 55, 0 25');
          border: none;
          border-radius: 13px;
          background-color: var(--primaryBg);
          box-shadow: 0px -3px 15px 0px var(--primaryHi) inset;
          color: var(--primaryFg);
          font-family: 'Manrope';
          font-size: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: absolute;
          transform: translateY(0px);
          transition: all 0.2s ease;
        }

        span {
          width: 100px;
          height: 60px;
          background-color: var(--primaryHi);
          border-radius: 100%;
          filter: blur(20px);
          position: absolute;
          bottom: -50%;
          transition: all 0.2s ease;
        }

        .button:hover > span {
          opacity: 60%;
        }

        .button:hover > button {
          transform: translateY(5px);
        }

        .button.first {
          top: 12%;
          right: 20%;
        }

        .button.sec {
          bottom: 13%;
          right: 11%;
        }

        .button.sec > button {
          background-color: var(--accentBg);
          box-shadow: 0px -3px 15px 0px var(--accentHi) inset;
          color: var(--accentFg);
        }

        .button.sec > span {
          background-color: var(--accentHi);
        }

        .button.third {
          bottom: 25%;
          left: 15%;
        }

        .button.third > button {
          background-color: var(--secondaryBg);
          box-shadow: 0px -3px 15px 0px var(--secondary) inset;
          color: var(--secondaryFg);
        }

        .button.third > span {
          background-color: var(--secondaryHi);
        }

        .top-right {
          position: absolute;
          top: 0;
          right: 0;
          z-index: -1;
          opacity: 50%;
        }

        .bottom-left {
          position: absolute;
          bottom: 0;
          left: 0;
          z-index: -1;
          opacity: 50%;
        }

        @media screen and (max-width: 1000px) {
          .title {
            font-size: 4rem;
          }

          .title > p {
            line-height: 5rem;
            letter-spacing: -0.3rem;
          }

          nav > :not(.sitename, .material-icons) {
            display: none;
          }

          nav {
            justify-content: space-between;
          }

          .material-icons {
            display: flex;
            align-items: center;
          }
        }
      `}</style>

      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      <div className="grid">
        <svg className="grid-svg" xmlns="http://www.w3.org/2000/svg" width="982" height="786" viewBox="0 0 982 786" fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M490 401V537H348.5V401H490ZM490 785.5V676H348.5V785.5H347.5V676H206V785.5H205V676H63
