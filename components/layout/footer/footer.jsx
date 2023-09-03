import Link from 'next/link';
import useMediaQuery from '@/hooks/use-media-query';

const Footer = () => {
  const { isMobile } = useMediaQuery();

  return (
    <>
      <footer className="relative mt-12 mb-20 left-1/2 bottom-2 transform -translate-x-1/2 w-[200px]">
        <p className="mt-10 mb-4 text-black text-semibold text-center text-lg">
          Made by{' '}
          <Link
            className="text-blue-800"
            target="_blank"
            href="https://twitter.com/NerdyProgramme2"
          >
            @urdadx
          </Link>
        </p>
      </footer>
      {isMobile && <div className="h-[40px] mb-24" />}
    </>
  );
};

export default Footer;
