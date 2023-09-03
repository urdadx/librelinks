/* eslint-disable react-hooks/exhaustive-deps */
import useCurrentUser from '@/hooks/useCurrentUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { signalIframe } from '@/utils/helpers';

const ButtonSelector = () => {
  const { data: currentUser } = useCurrentUser();
  const [buttonStyle, setButtonStyle] = useState(null);
  const buttonFromDB = currentUser?.buttonStyle;

  const queryClient = useQueryClient();

  useEffect(() => {
    const storedButton = buttonFromDB || localStorage.getItem('button-style');
    if (storedButton) {
      setButtonStyle(storedButton);
    }
    getThemeStyles();
  }, [buttonFromDB]);

  const mutateButtonStyle = useMutation(
    async (buttonCSS) => {
      await axios.patch('/api/customize', {
        buttonStyle: buttonCSS,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
        signalIframe();
      },
    }
  );

  const handleChangeBtn = async (buttonCSS) => {
    await toast.promise(mutateButtonStyle.mutateAsync(buttonCSS), {
      loading: 'Applying style',
      success: 'Style applied successfully',
      error: 'An error occured',
    });
    setButtonStyle(buttonCSS);
    localStorage.setItem('button-style', buttonCSS);
  };

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
  };

  const buttonOptions = [
    {
      category: 'Fill',
      buttonType: [
        {
          css: ' rounded-none',
          button: (
            <button className="w-[180px] h-[36px] bg-black border-none" />
          ),
        },
        {
          css: ' rounded-md',
          button: (
            <button className="w-[180px] h-[36px] bg-black border-none rounded-md" />
          ),
        },
        {
          css: ' rounded-full',
          button: (
            <button className="w-[180px] h-[36px] bg-black border-none rounded-full" />
          ),
        },
      ],
    },
    {
      category: 'Transparent',
      buttonType: [
        {
          css: 'rounded-none bg-transparent',
          button: <button className="w-[180px] h-[36px] border border-black" />,
        },
        {
          css: 'rounded-md bg-transparent',
          button: (
            <button className="w-[180px] h-[36px] border border-black rounded-md" />
          ),
        },
        {
          css: 'rounded-full bg-transparent',
          button: (
            <button className="w-[180px] h-[36px] border border-black rounded-full" />
          ),
        },
      ],
    },
    {
      category: 'Hard shadow',
      buttonType: [
        {
          css: ' rounded-none shadow',
          button: (
            <button className="w-[180px] h-[36px] border border-black shadow-[4px_4px_0_0_#000000]" />
          ),
        },
        {
          css: ' rounded-md shadow',
          button: (
            <button className="w-[180px] h-[36px] border border-black rounded-md shadow-[4px_4px_0_0_#000000]" />
          ),
        },
        {
          css: ' rounded-full shadow',
          button: (
            <button className="w-[180px] h-[36px] border border-black rounded-full shadow-[4px_4px_0_0_#000000]" />
          ),
        },
      ],
    },
  ];

  return (
    <div className="max-w-[640px] mx-auto my-4">
      <h3 className="text-xl font-semibold">Buttons</h3>
      <div className="mt-4 rounded-2xl border bg-white p-4 w-full h-auto">
        {buttonOptions?.map(({ category, buttonType }) => (
          <div key={category} className="mb-6">
            <p className="text-inherit pb-2">{category}</p>
            <div className="inline-grid w-full grid-cols-[repeat(auto-fit,_minmax(130px,_1fr))] gap-4">
              {buttonType?.map(({ css, button }) => (
                <span
                  className="inline-flex items-center"
                  key={css}
                  onClick={() => handleChangeBtn(css)}
                  style={getThemeStyles(css)}
                >
                  {button}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ButtonSelector;
