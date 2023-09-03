import { Oval } from 'react-loader-spinner';

export const TinyLoader = ({ color, size, stroke }) => {
  return (
    <>
      <Oval
        height={size}
        width={size}
        color={color}
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor={color}
        strokeWidth={stroke}
        strokeWidthSecondary={stroke}
      />
    </>
  );
};
