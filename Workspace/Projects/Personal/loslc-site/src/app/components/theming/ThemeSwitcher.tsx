import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { IoSunnyOutline } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";
export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant={"outline"}
      className="w-[40px] h-[40px] rounded-full"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <IoMoonOutline /> : <IoSunnyOutline />}
    </Button>
  );
}
