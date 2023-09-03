import { useEffect, useState } from 'react';

export default function useMediaQuery() {
  const [device, setDevice] = useState(null);
  const [dimensions, setDimensions] = useState(null);

  useEffect(() => {
    const checkDevice = () => {
      if (window.matchMedia('(max-width: 640px)').matches) {
        setDevice('mobile');
      } else if (
        window.matchMedia('(min-width: 641px) and (max-width: 1024px)').matches
      ) {
        setDevice('tablet');
      } else {
        setDevice('desktop');
      }
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    // Initial detection
    checkDevice();

    // Listener for windows resize
    const resizeHandler = () => checkDevice();
    window.addEventListener('resize', resizeHandler);

    // Cleanup listener
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return {
    device,
    width: dimensions ? dimensions.width : null,
    height: dimensions ? dimensions.height : null,
    isMobile: device === 'mobile',
    isTablet: device === 'tablet',
    isDesktop: device === 'desktop',
  };
}
