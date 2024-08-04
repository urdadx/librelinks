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
          clip-path: path("M 0 25 C 0 -5, -5 0, 80 0 S 160 -5, 160 25, 165 50 80 50, 0 55, 0 25");
          border: none;
          border-radius: 13px;
          background-color: var(--primaryBg);
          box-shadow: 0px -3px 15px 0px var(--primaryHi) inset;
          color: var(--primaryFg);
          font-family: "Manrope";
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
            d="M490 401V537H348.5V401H490ZM490 785.5V676H348.5V785.5H347.5V676H206V785.5H205V676H63.5V785.5H62.5V676H0V675H62.5V538H0V537H62.5V401H0V400H62.5V258H0V257H62.5V116H0V115H62.5V0H63.5V115L205 115V0H206V115L347.5 115V0H348.5V115H490V0H491V115L627.5 115V0H628.5V115H765V0H766V115L902.5 115V0H903.5V115H982V116H903.5V257H982V258H903.5V400H982V401H903.5V537H982V538H903.5V675H982V676H903.5V785.5H902.5V676H766V785.5H765V676H628.5V785.5H627.5V676H491V785.5H490ZM902.5 675V538H766V675H902.5ZM902.5 537V401H766V537H902.5ZM902.5 400V258H766V400H902.5ZM902.5 257V116L766 116V257H902.5ZM627.5 675H491V538H627.5V675ZM765 675H628.5V538H765V675ZM348.5 675H490V538H348.5V675ZM347.5 538V675H206V538H347.5ZM205 538V675H63.5V538H205ZM765 537V401H628.5V537H765ZM765 400V258H628.5V400H765ZM765 257V116H628.5V257H765ZM347.5 401V537H206V401H347.5ZM205 401V537H63.5V401H205ZM627.5 401V537H491V401H627.5ZM627.5 116L491 116V257H627.5V116ZM627.5 258H491V400H627.5V258ZM63.5 257V116L205 116V257H63.5ZM63.5 400V258H205V400H63.5ZM206 116V257H347.5V116L206 116ZM348.5 116V257H490V116H348.5ZM206 400V258H347.5V400H206ZM348.5 258V400H490V258H348.5Z"
            fill="url(#paint0_radial_1_8)"
          />
          <defs>
            <radialGradient
              id="paint0_radial_1_8"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(491 392.75) rotate(90) scale(513.25 679.989)"
            >
              <stop stopColor="white" stopOpacity="0.2" />
              <stop offset="1" stopColor="#000" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
        <div className="blur"></div>
      </div>

      <div className="title">
        <p>get</p>
        <p>
          <strong>hyp</strong>e'd by
        </p>
        <p>
          <strong>me</strong>!
        </p>
      </div>

      <a href="#" target="_blank" className="button first">
        <button>Contact</button>
        <span></span>
      </a>

      <a href="https://www.youtube.com/@merecod" target="_blank" className="button sec">
        <button>YouTube Channel</button>
        <span></span>
      </a>

      <a href="#" target="_blank" className="button third">
        <button>Artists</button>
        <span></span>
      </a>

      <svg className="top-right" width="219" height="147" viewBox="0 0 219 147" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
          opacity="0.18"
          x="10.4252"
          y="75.8326"
          width="7.50168"
          height="7.50168"
          transform="rotate(110.283 10.4252 75.8326)"
          fill="#686868"
          stroke="white"
          strokeWidth="1.22683"
        />
        <rect
          opacity="0.18"
          x="180.869"
          y="138.825"
          width="7.50168"
          height="7.50168"
          transform="rotate(110.283 180.869 138.825)"
          fill="#686868"
          stroke="white"
          strokeWidth="1.22683"
        />
        <rect
          x="69.4713"
          y="-91.84"
          width="180.485"
          height="180.485"
          transform="rotate(20.2832 69.4713 -91.84)"
          stroke="white"
          strokeOpacity="0.1"
          strokeWidth="1.22683"
        />
      </svg>

      <svg className="bottom-left" width="232" height="191" viewBox="0 0 232 191" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50.5685" cy="172.432" r="112.068" stroke="white" strokeOpacity="0.09" />
        <g opacity="0.1">
          <path d="M26.4932 5.20547L228.856 172.432" stroke="#D9D9D9" />
          <rect x="22.4384" y="0.5" width="6.15753" height="6.15753" fill="#686868" stroke="white" />
          <rect x="224.801" y="169.027" width="6.15753" height="6.15753" fill="#686868" stroke="white" />
          <circle cx="121.819" cy="83.613" r="1.7774" fill="#323232" stroke="white" />
        </g>
      </svg>
    </>
  );
};

export default Home;
