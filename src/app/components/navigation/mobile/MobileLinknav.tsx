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
    <div className="py-4 px-2">
      <div className="flex flex-col items-center gap-2">
        {links.map((group, index) => {
          if (group.single && group.href) {
            return (
              <Link
                className={`${buttonVariants({ variant: "ghost" })} w-full justify-start text-lg py-3`}
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
                  className="border-b-0"
                >
                  <AccordionTrigger
                    className={`${buttonVariants({ variant: "ghost" })} w-full justify-between text-lg py-3`}
                  >
                    {group.name}
                  </AccordionTrigger>
                  <div className="flex flex-col space-y-1 pl-2">
                    {group.links.map((link, i) => {
                      return (
                        <AccordionContent key={i}>
                          <Link
                            href={link.href}
                            className="flex items-center gap-2 py-2 px-4 rounded-md hover:bg-accent transition-colors"
                          >
                            {link.icon ? <span className="text-lg">{link.icon}</span> : <></>}
                            <div className="flex flex-col">
                              <span className="text-foreground">{link.name}</span>
                              <span className="text-muted-foreground text-xs">{link.description}</span>
                            </div>
                          </Link>
                        </AccordionContent>
                      );
                    })}
                  </div>
                </AccordionItem>
              </Accordion>
            );
          }
        })}
      </div>
    </div>
  );
}
