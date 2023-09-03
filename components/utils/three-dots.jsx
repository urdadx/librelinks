const ThreeDots = () => {
  return (
    <>
      <svg
        fill="none"
        shapeRendering="geometricPrecision"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        width="14"
        height="14"
        className="h-5 w-5 text-gray-500 absolute top-1/2 left-[95%] -translate-x-1/2 -translate-y-1/2 lg:left-[97%] md:left-[97%]"
      >
        <circle cx="12" cy="12" r="1"></circle>
        <circle cx="12" cy="5" r="1"></circle>
        <circle cx="12" cy="19" r="1"></circle>
      </svg>
    </>
  );
};

export default ThreeDots;
