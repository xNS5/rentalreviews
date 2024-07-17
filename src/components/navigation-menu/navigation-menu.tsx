import {
    NavigationMenu as NavigationMenuComponent,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { NavbarItem } from "../navbar/navbartypes"
import Link from "next/link";

export default function NavigationMenu({ link }: Readonly<{
    link: NavbarItem;
}>) {
    return (
        <NavigationMenuComponent>
            <NavigationMenuList>
                <NavigationMenuItem>
                <NavigationMenuTrigger className={`focusable hover:bg-white focus:bg-white p-2 w-fit text-[length:inherit] font-normal rounded px-3`}>{link.name}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ol className="w-max">
                            {link?.children.map((child: NavbarItem, i: number) => (
                                <li key={i} className={`!block ${navigationMenuTriggerStyle()}`}>
                                    <Link href={child.url}>
                                        {child.name}
                                    </Link>
                                </li>
                            ))}
                        </ol>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenuComponent>
    )
}
