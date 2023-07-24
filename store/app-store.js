import { create } from "zustand";

const usePopOver = create((set) => ({
    isOpen: true,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default usePopOver;