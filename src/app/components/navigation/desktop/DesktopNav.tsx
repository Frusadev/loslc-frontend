import Link from "next/link";
import ThemeSwitcher from "../../theming/ThemeSwitcher";
import Image from "next/image";

export default function Navbar({ className }: { className?: string }) {
  return (
    <div
      className={`w-full h-20 border-b border-border bg-background/60 z-50 sticky top-0 flex justify-between items-center backdrop-blur-lg px-10 ${className}}`}
    >
      <Link href={"/"} className="px-2 font-bold text-xl select-none">
        <Image
          alt="Linux and Open-source lover community logo"
          src={"/logo.png"}
          width={50}
          height={50}
          className="rounded-full"
        />
      </Link>
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
