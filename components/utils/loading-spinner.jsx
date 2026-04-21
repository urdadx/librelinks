import React from 'react';
import { Oval } from 'react-loader-spinner';

const Loader = ({
  bgColor,
  textColor,
  message,
  width,
  height,
  strokeWidth,
  fullPage = false,
}) => {
  const containerClassName = fullPage
    ? 'flex min-h-screen w-full flex-col items-center justify-center'
    : 'flex w-full flex-col items-center justify-center';

  return (
    <div className={containerClassName}>
      <div className="mx-auto flex justify-center">
        <Oval
          height={height ? height : 70}
          width={width ? width : 70}
          color={bgColor}
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor={bgColor}
          strokeWidth={strokeWidth ? strokeWidth : 2}
          strokeWidthSecondary={2}
        />
      </div>
      <div className="mx-auto flex justify-center">
        <h3 className={`${textColor} font-semibold text-l`}>{message}</h3>
      </div>
    </div>
  );
};

export default Loader;
