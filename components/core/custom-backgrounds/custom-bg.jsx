import ColorPicker from "../custom-page-themes/solid-color-picker";
import { customExports, buttonConfigs } from "@/utils/themes";
import { useEffect, useState } from "react";
import GradientPicker from "../custom-page-themes/gradients-picker";
import toast from "react-hot-toast";
import useCurrentUser from "@/hooks/useCurrentUser";
import { mutate } from "swr";
import axios from "axios";

const CustomBackgrounds = () => {

  const { data: currentUser } = useCurrentUser();
  const [selectedButton, setSelectedButton] = useState("");

  useEffect(() => {
    setSelectedButton(currentUser?.customizations.currentStyle);
  },[currentUser?.customizations.currentStyle])

  const handleCustomBg = async (id) => {
    setSelectedButton(id);
     const updatedJSON = {
          gradientColor: currentUser?.customizations.gradientColor,
          solidColor: currentUser?.customizations.solidColor,
          buttonStyle: currentUser?.customizations.buttonStyle,
          currentStyle: id,
          image: currentUser?.customizations.image
      } 

      await axios.patch("/api/customize", { updatedJSON });
      mutate("/api/customize");
          
  };

  const showComingSoonToast = (name) => {
    if(name === "Video" || name === "Image"){
      return toast("Coming soon", {
         icon: "⏳"
      } )
    }
  }
  

  return (
    <>
      <div className="max-w-[640px] mx-auto my-6 z-10">
        <h3 className="text-xl font-semibold">Custom backgrounds</h3>
        <div className="mt-4 rounded-2xl border bg-white p-4 w-full h-auto">
          <div className="inline-grid w-full grid-cols-[repeat(auto-fit,_minmax(130px,_1fr))] gap-4">
            {buttonConfigs.map((config) => (
              <div key={config.id}>
                <div>
                  <button onClick={() => handleCustomBg(config.id)}>
                    <div>
                      <span className={`relative w-full overflow-hidden flex 
                          flex-col p-1  items-center focus:outline-none ${
                          selectedButton === config.id ? "border-2 border-gray-500 px-auto py-auto rounded-lg" : ""
                        }`}>
                        <div 
                          className="w-[130px] h-[200.5px] rounded-lg"
                          style={{
                            background: config.style.background,
                          }}
                        ></div>
                      </span>
                    </div>
                  </button>
                  <p className={`${ selectedButton === config.id ? 
                      "pt-1 text-center" : "pt-1 text-center"}`}>
                      {config.style.label}
                  </p>
                  </div>
              </div>
            ))}

            {customExports?.map((item) => (
              <div
                key={item.name}
                className="px-2 py-1 relative flex flex-col items-center"
              >
                <button onClick={() => showComingSoonToast(item.name)} 
                  className=" border-2 relative flex w-[130px] h-[200.5px] 
                  flex-col items-center border-gray-200 border-dashed rounded-lg">
                  <div className="flex items-center justify-center">
                    <div className="absolute top-1/2 transform -translate-y-1/2">
                      <img
                        src={item.icon}
                        alt="image_svg"
                        className="w-[50px] h-[50px]"
                      />
                    </div>
                  </div>
                  {item.comingSoon && (
                    <div className="absolute font-semibold top-2 right-2
                       bg-slate-900 text-white text-xs px-2 py-1 rounded">
                      Coming Soon
                    </div>
                  )}
                </button>
                <p className="pt-3 text-center">{item.name}</p>
              </div>
            ))}


            {selectedButton === "gradient" ? (
              <>
                <GradientPicker />
              </>
            ) : (
              <ColorPicker title="Color" />
            )}

          </div>
            
          </div>
      </div>
    </>
  );
};

export default CustomBackgrounds;
