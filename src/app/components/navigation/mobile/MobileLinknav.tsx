import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import { DrawerContent } from "@/components/ui/drawer";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

interface Link {
  name: string;
  href: string;
  description: string;
  icon?: React.ReactNode;
}

interface LinkGroup {
  name: string;
  links: Link[];
  single: boolean;
  href?: string;
}

export default function MobileLinknav({ links }: { links: LinkGroup[] }) {
  return (
    <div className="py-3">
      <div className="flex flex-col items-center">
        {links.map((group, index) => {
          if (group.single && group.href) {
            return (
              <Link
                className={buttonVariants({ variant: "ghost" }) + " w-full"}
                href={group.href}
                key={index}
              >
                {group.name}
              </Link>
            );
          } else if (!group.single) {
            return (
              <Accordion key={index} type="multiple" className="w-full">
                <AccordionItem
                  key={index}
                  value={group.name}
                  className="flex flex-col transition-all justify-stretch items-center w-full"
                >
                  <AccordionTrigger
                    className={`${buttonVariants({ variant: "ghost" })} w-full`}
                  >
                    {group.name}
                  </AccordionTrigger>
                  {group.links.map((link, i) => {
                    return (
                      <AccordionContent key={i} className="motion-preset-fade">
                        <Link
                          href={link.href}
                          key={link.name}
                          className="flex items-center gap-1"
                        >
                          {link.icon ? link.icon : <></>}
                          {link.name}
                        </Link>
                      </AccordionContent>
                    );
                  })}
                </AccordionItem>
              </Accordion>
            );
          }
        })}
      </div>
    </div>
  );
}
