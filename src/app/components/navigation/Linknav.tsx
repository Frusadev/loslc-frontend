import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

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
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <div className="line-clamp-2 text-sm leading-snug text-muted-foreground flex gap-1">
            {children}
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
export default function Linknav({ links }: { links: LinkGroup[] }) {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          {links.map((group) => {
            if (group.single && group.href) {
              return (
                <NavigationMenuItem key={group.name}>
                  <Link href={group.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle() + " bg-transparent"}
                    >
                      {group.name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              );
            } else if (group.links.length > 1) {
              return (
                <NavigationMenuItem key={group.name}>
                  <NavigationMenuTrigger className="bg-transparent">{group.name}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {group.links.map((link) => (
                        <ListItem
                          key={link.name}
                          title={link.name}
                          href={link.href}
                        >
                          {link.icon ? link.icon : <></>}
                          {link.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            }
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
