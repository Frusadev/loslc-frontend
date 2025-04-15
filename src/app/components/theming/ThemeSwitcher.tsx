import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { IoSunnyOutline } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  
  return (
    <Button
      variant={"ghost"}
      className="w-10 h-10 rounded-full flex items-center justify-center"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
    >
      {theme === "dark" ? (
        <IoMoonOutline className="size-5 text-foreground" />
      ) : (
        <IoSunnyOutline className="size-5 text-foreground" />
      )}
    </Button>
  );
}
