import { IoLogoDiscord, IoLogoGithub, IoLogoWhatsapp } from "react-icons/io5";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import StaffMember, {
  StaffProfile,
} from "./components/people/staff/StaffMember";
import { Navbar } from "./components/navigation/Navbar";

const teamMembers: StaffProfile[] = [
  {
    firstName: "Daniel",
    lastName: "AMETSOWOU",
    email: "frusadev@gmail.com",
    title: "Founder",
    image: "/staff/dani.png",
    bio: "Daniel is deeply interested in science and technology. He began programming at 12 and has been building projects and honing his skills ever since.",
  },
  {
    firstName: "Denise",
    lastName: "DEABALO",
    email: "dinaisedeabalo@gmail.com",
    title: "Secretary",
    image: "/staff/den.png",
    bio: "Denise is a full-stack web developer who builds dynamic, responsive, and efficient web applications. She loves solving problems and exploring new technologies to enhance user experiences.",
  },
  {
    firstName: "Rayane",
    lastName: "TCHABODI",
    email: "rayanetchabodi360@gmail.com",
    title: "Communication Lead",
    image: "/staff/ray.jpg",
    bio: "Rayane is a full-stack web developer who enjoys creating modern, scalable applications. He is always eager to learn new technologies and improve user experiences.",
  },
  {
    firstName: "Laureen",
    lastName: "EKON",
    email: "ekonlaureen16@gmail.com",
    title: "Community Relations Manager",
    image: "/staff/laur.png",
    bio: "Laureen is dedicated to open-source and robotics, actively contributing to innovative projects and collaborating with the tech community. She thrives on learning and staying ahead of emerging technologies.",
  },
  {
    firstName: "Emerick",
    lastName: "MITCHIKPE",
    email: "mitchikpeemerick2@gmail.com",
    title: "Community Manager",
    image: "/staff/emer.png",
    bio: "Emerick specializes in cybersecurity and is the founder of ETHIX Community. As a CTF player, challenge creator, and freelance junior penetration tester, he is steadily advancing in the field.",
  },
  {
    firstName: "Bayédzè",
    lastName: "COMLAN",
    email: "bayedzenetworking@gmail.com",
    title: "Community Manager",
    image: "/staff/bay.png",
    bio: "Bayédzè is a system administrator with a strong focus on network security and infrastructure management. He enjoys optimizing systems and ensuring reliable performance.",
  },
  {
    firstName: "Kallern",
    lastName: "ATTER",
    email: "hackusman@gmail.com",
    title: "Project Security Tester",
    image: "/staff/kall.png",
    bio: "Kallern is a cybersecurity enthusiast passionate about ethical hacking and digital security. He continuously sharpens his skills to protect systems from emerging threats.",
  },
];

export default function Home() {
  return (
    <div className="relative flex-col w-screen h-screen scroll-smooth">
      <Navbar />
      <img
        src="/blobs/blob-yellow.svg"
        alt="blob"
        className="absolute top-30 md:bottom-2 w-4/12 right-2 motion-preset-oscillate motion-duration-2000 opacity-70"
      />
      <img
        src="/blobs/blob-move.svg"
        alt="blob"
        className="absolute right-120 w-4/12 top-20 motion-preset-spin motion-duration-2000 opacity-70"
      />
      <img
        src="/blobs/blob-sky.svg"
        alt="blob"
        className="absolute top-70 w-4/12 left-3 opacity-70"
      />
      <div className="flex w-screen min-h-[60vh] md:h-screen justify-center z-20 md:items-center bg-background/50 backdrop-blur-2xl">
        <div className="w-10/12 sm:w-8/12 flex justify-center items-center py-16 md:py-0">
          <span className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-foreground motion-preset-slide-up text-center">
            A community for{" "}
            <span className="bg-clip-text text-transparent from-primary to-sky-400 bg-gradient-to-r">
              open-source
            </span>{" "}
            enthousiasts and{" "}
            <span className="bg-gradient-to-r bg-clip-text text-transparent from-yellow-800 to-yellow-400">
              Linux
            </span>{" "}
            lovers.
          </span>
        </div>
      </div>
      {/* Next section */}
      <div
        className="flex flex-col items-center md:flex-row w-screen h-auto md:h-screen gap-6 md:gap-10 justify-around px-4 md:px-20 py-8 md:py-4"
      >
        <div className="flex flex-col h-full w-full sm:w-11/12 gap-8 md:gap-0 md:w-1/2 rounded-xl bg-background justify-around p-4 md:p-6">
          <div className="flex flex-col gap-3 md:gap-4 text-center">
            <span className="text-xl sm:text-2xl md:text-4xl font-bold">
              Building Open-Source as a community
            </span>
            <span className="text-slate-500 text-sm sm:text-base">
              Open-source thrives on collaboration and shared ownership.
              Contributors create innovative solutions that benefit everyone,
              driving a movement that reshapes technology.
            </span>
          </div>
          <div className="flex flex-col gap-3 md:gap-4 text-center">
            <span className="text-xl sm:text-2xl md:text-4xl font-bold">
              Grow together
            </span>
            <span className="text-slate-500 text-sm sm:text-base">
              Growth is stronger when shared. Through mentorship and
              collaboration, we accelerate progress and create an environment
              where everyone can thrive together.
            </span>
          </div>
        </div>
        <div className="flex flex-col h-full gap-8 md:gap-0 w-full sm:w-11/12 md:w-1/2 rounded-xl bg-background p-4 md:p-6 justify-around">
          <div className="flex flex-col gap-3 md:gap-4 text-center">
            <span className="text-xl sm:text-2xl md:text-4xl font-bold">
              Teach others by sharing your knowledge
            </span>
            <span className="text-slate-500 text-sm sm:text-base">
              Knowledge sharing empowers others, fosters innovation, and pushes
              boundaries. It's about making a meaningful impact beyond
              individual learning.
            </span>
          </div>
          <div className="flex flex-col gap-3 md:gap-4 text-center">
            <span className="text-xl sm:text-2xl md:text-4xl font-bold">
              Thriving Together, Not Just Surviving
            </span>
            <span className="text-slate-500 text-sm sm:text-base">
              In a strong community, no one struggles alone. We support each
              other, share knowledge, and grow collectively. Progress is faster
              and more fulfilling when we build together.
            </span>
          </div>
        </div>
      </div>
      {/* Staff and Contact section*/}
      <div className="min-h-screen">
        <div className="w-full px-4 md:px-20 mt-6 md:mt-10">
          <Separator />
        </div>
        <div id="contact" className="flex flex-col w-screen mt-6 md:mt-10 items-center">
          <div className="flex flex-col w-full items-center justify-center px-4 md:px-52 gap-3 md:gap-4">
            <span className="text-3xl md:text-4xl font-bold">Our team</span>
            <span className="text-center text-slate-600 text-sm sm:text-base w-11/12 md:w-auto">
              Passionate, skilled, and collaborative, our team brings ideas to
              life and drives innovation forward.
            </span>
          </div>
          <div className="flex px-2 md:px-4 items-center flex-wrap justify-center mt-6 md:mt-9 gap-4 md:gap-6">
            {teamMembers.map((member, index) => {
              return <StaffMember key={index} profile={member} />;
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-screen mt-6 md:mt-10 items-center py-4 md:py-6">
        <span className="text-xl sm:text-2xl md:text-3xl text-center px-4 w-full md:w-9/12 font-bold">
          Join our community and start collaborating today.
        </span>
        <div className="flex items-center justify-center gap-8 sm:gap-12 md:gap-20 py-6 md:py-10">
          <Link href="https://chat.whatsapp.com/BcapIUdCapFLBsHgdXVfcQ" className="hover:scale-110 transition-transform">
            <IoLogoWhatsapp className="w-10 h-10 md:w-[50px] md:h-[50px]" color="#25D366" />
          </Link>
          <Link href="https://discord.gg/eu7WKAnv" className="hover:scale-110 transition-transform">
            <IoLogoDiscord className="w-10 h-10 md:w-[50px] md:h-[50px]" color="#5865F2" />
          </Link>
          <Link href="https://github.com/LOSLC" className="hover:scale-110 transition-transform">
            <IoLogoGithub className="w-10 h-10 md:w-[50px] md:h-[50px]" />
          </Link>
        </div>
      </div>
      {/* Footer */}
      <div className="flex flex-col w-screen py-4 bg-background/50">
        <span className="text-slate-500 text-center text-sm">
          © 2025 LOSLC. All rights reserved.
        </span>
      </div>
    </div>
  );
}
