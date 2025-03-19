import { create } from "zustand";
type BrowserWindow = {
  height: number;
  width: number;
  changeWindowSize: (height: number, width: number) => void;
  handleResize: () => void;
};

export const useWindowSize = create<BrowserWindow>((set) => ({
  height: window.innerHeight,
  width: window.innerWidth,
  changeWindowSize: (height, width) => set({ height, width }),
  handleResize: () => {
    set({ height: window.innerHeight, width: window.innerWidth });
  }
}));
