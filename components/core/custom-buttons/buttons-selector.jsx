import useCurrentUser from '@/hooks/useCurrentUser';
import { useCallback, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const ButtonSelector = () => {
  
  const { data: currentUser } = useCurrentUser();
  const [buttonStyle, setButtonStyle] = useState(null);
  const buttonFromDB = currentUser?.buttonStyle;

  useEffect(() => {
    const storedButton = buttonFromDB ? buttonFromDB : localStorage.getItem('button-style');
    if (storedButton) {
      setButtonStyle(storedButton);
    }
    getThemeStyles();
  }, [buttonFromDB]);

  const handleChangeBtn = useCallback(
    async (buttonCSS) => {
      await toast.promise(
        axios.patch('/api/customize', { buttonStyle: buttonCSS }),
        {
          loading: 'Applying style',
          success: 'Style applied successfully',
          error: 'An error occurred',
        }
      );
      setButtonStyle(buttonCSS);
      localStorage.setItem('button-style', buttonCSS);
    },
    [buttonFromDB]
  );

  const getThemeStyles = (css) => {
    if (buttonStyle === css) {
      return {
        border: '2px solid #a8aaa2',
        borderRadius: '0.735rem',
        padding: '7px',
        display: 'inline-flex',
        alignItems: 'center',
        transform: 'scale(0.9)',
        animation: 'zoomOut 0.3s',
      };
    }
    return {};
  };

  const buttonOptions = [
    {
      category: 'Fill',
      buttonType: [
        {
          css: ' rounded-none',
          button: <button className="w-[180px] h-[36px] bg-black border-none"></button>,
        },
        {
          css: ' rounded-md',
          button: <button className="w-[180px] h-[36px] bg-black border-none rounded-md"></button>,
        },
        {
          css: ' rounded-full',
          button: <button className="w-[180px] h-[36px] bg-black border-none rounded-full"></button>,
        },
      ],
    },
    {
      category: 'Transparent',
      buttonType: [
        {
          css: 'rounded-none bg-transparent',
          button: <button className="w-[180px] h-[36px] border border-black"></button>,
        },
        {
          css: 'rounded-md bg-transparent',
          button: <button className="w-[180px] h-[36px] border border-black rounded-md"></button>,
        },
        {
          css: 'rounded-full bg-transparent',
          button: <button className="w-[180px] h-[36px] border border-black rounded-full"></button>,
        },
      ],
    },
    {
      category: 'Hard shadow',
      buttonType: [
        {
          css: ' rounded-none shadow',
          button: <button className="w-[180px] h-[36px] border border-black shadow-[4px_4px_0_0_#000000]"></button>,
        },
        {
          css: ' rounded-md shadow',
          button: (
            <button className="w-[180px] h-[36px] border border-black rounded-md shadow-[4px_4px_0_0_#000000]"></button>
          ),
        },
        {
          css: ' rounded-full shadow',
          button: (
            <button className="w-[180px] h-[36px] border border-black rounded-full shadow-[4px_4px_0_0_#000000]"></button>
          ),
        },
      ],
    },
  ];

  return (
    <>
      <div className="max-w-[640px] mx-auto my-4">
        <h3 className="text-xl font-semibold">Buttons</h3>
        <div className="mt-4 rounded-2xl border bg-white p-4 w-full h-auto">
          {buttonOptions?.map((option) => {
            return (
              <div key={option.category} className="mb-6">
                <p className="text-inherit pb-2">{option.category}</p>
                <div className="inline-grid w-full grid-cols-[repeat(auto-fit,_minmax(130px,_1fr))] gap-4">
                  {option.buttonType?.map((type, index) => {
                    return (
                      <span
                        className="inline-flex items-center"
                        key={index}
                        onClick={() => handleChangeBtn(type.css)}
                        style={getThemeStyles(type.css)}
                      >
                        {type.button}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ButtonSelector;
