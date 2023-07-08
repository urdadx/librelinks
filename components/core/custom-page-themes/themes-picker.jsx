import { useCallback, useEffect, useState } from 'react';
import { themes } from '@/utils/themes';
import { CheckMark } from '@/components/utils/checkmark';
import useCurrentUser from '@/hooks/useCurrentUser';
import axios from 'axios';
import toast from "react-hot-toast";
import { mutate } from 'swr';

const ThemesPicker = () => {
  const { data: currentUser } = useCurrentUser();
  const [displayedThemes, setDisplayedThemes] = useState(themes.slice(0, 9));
  const [showAll, setShowAll] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const themeFromDB = currentUser?.themePalette.name;

  useEffect(() => {
  const storedTheme = themeFromDB ? themeFromDB : localStorage.getItem('selectedTheme');
    if (storedTheme) {
      const theme = themes.find((t) => t.name === storedTheme);
      if (theme) {
        setSelectedTheme(theme);
      }
    }
  }, [themeFromDB]);

  const handleShowMore = () => {
    setShowAll(true);
    setDisplayedThemes(themes);
  };

  const handleShowLess = () => {
    setDisplayedThemes(themes.slice(0, 9));
    setShowAll(false);
  };

  const handleThemeSelect = useCallback( async (theme) => {
    await toast.promise(
        axios.patch("/api/customize", { themePalette: theme }),
        {
            loading: "Applying theme",
            success: "Theme applied successfully",
            error: "An error occured"
        }
    )
    setSelectedTheme(theme);
    mutate(`/api/users/${currentUser?.handle}`);
    localStorage.setItem('selectedTheme', theme.name);
  }, [selectedTheme])

  return (
    <>
      <div className="max-w-[640px] mx-auto my-6">
        <h3 className="text-xl font-semibold">Themes</h3>
        <div className="my-4 grid grid-cols-2 lg:grid-cols-3 rounded-2xl auto-rows-max gap-4 max-w-md md:gap-6 md:max-w-2xl lg:max-w-3xl p-4 mx-auto md:basis-3/5 w-full overflow-y-auto bg-white">
          {displayedThemes?.map((theme) => (
            <div
              key={theme.name}
              className={`rounded-2xl overflow-hidden cursor-pointer relative z-0 duration-200 w-full border-2 ${
                selectedTheme === theme ? 'border-[2.5px] border-blue-500' : 'border-primary'
              }`}
              onClick={() => handleThemeSelect(theme)}
            >
              <div className="grid grid-cols-4 h-24 md:h-28">
                {theme.palette.map((color) => (
                  <div key={color} className="h-full" style={{ background: color }} />
                ))}
              </div>
              <span
                style={{ color: theme.palette[2] }}
                className="absolute top-2 left-2 z-10 text-xs text-base-content/80"
              >
                {theme.name}
              </span>
              {selectedTheme === theme && (
                <span
                  style={{ color: theme.palette[0] }}
                  className="absolute top-2 right-2 z-10 text-xs text-base-content/80"
                >
                  <CheckMark />
                </span>
              )}
            </div>
          ))}
        </div>
        {!showAll && (
          <button
            className="block mx-auto mt-4 text-white bg-blue-600 rounded-lg py-2 px-4 hover:bg-blue-800"
            onClick={handleShowMore}
          >
            Show More
          </button>
        )}
        {showAll && (
          <button
            className="block mx-auto mt-4 text-white bg-blue-600 rounded-lg py-2 px-4 hover:bg-blue-800"
            onClick={handleShowLess}
          >
            Show Less
          </button>
        )}
      </div>
    </>
  );
};

export default ThemesPicker;
