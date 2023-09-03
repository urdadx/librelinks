import Link from 'next/link';
import { GridOverlay } from './grid-overlay';
import { ErrorSVG } from './404';
import Balancer from 'react-wrap-balancer';

const NotFound = () => {
  return (
    <>
      <GridOverlay />
      <div className="flex flex-col gap-4 top-1/2 translate-y-1/3 w-[100vw] h-[100vh]">
        <div className="flex justify-center">
          <ErrorSVG />
        </div>
        <h3 className="text-lg lg:text-3xl text-center">
          <Balancer>
            The page you&apos;re looking for doesn&apos;t exist
          </Balancer>
        </h3>
        <h3 className="text-sm lg:text-lg text-center">
          <Balancer>
            Want this to be your handle?
            <Link className="underline" href="/register">
              Create your account now
            </Link>
            🚀
          </Balancer>
        </h3>
      </div>
    </>
  );
};

export default NotFound;
