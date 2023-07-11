import { create } from "zustand";

const useCurrentRoute =
	(create < State) &
	(Action >
		((set) => ({
			routeName: "",
			updateRoute: (routeName) => set(() => ({ routeName: routeName })),
		})));

export default useCurrentRoute;
