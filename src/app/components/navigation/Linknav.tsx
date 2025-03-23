import Link from "next/link";
import ThemeSwitcher from "../theming/ThemeSwitcher";
import Image from "next/image";

export default function Linknav({ className }: { className?: string }) {
  return (
    <div
      className={`w-full h-20 bg-background/60 z-50 sticky top-0 flex justify-between items-center backdrop-blur-lg px-10 ${className}}`}
    >
      <div className="flex items-center gap-6 text-sm">
        <Link href={"/"} className="text-secondary-foreground/70 hover:text-primary transition-all">
          Home
        </Link>
        <Link href={"/"} className="text-secondary-foreground/70 hover:text-primary transition-all">
          Upcoming events
        </Link>
        <Link href={"/"} className="text-secondary-foreground/70 hover:text-primary transition-all">
          About
        </Link>
      </div>
      <div className="px-2">
        <ThemeSwitcher />
      </div>
    </div>
  );
}
