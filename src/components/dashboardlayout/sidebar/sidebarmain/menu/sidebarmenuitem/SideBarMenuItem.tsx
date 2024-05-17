import Link from "next/link";
import {LucideIcon} from "lucide-react";


interface SideBarMenuItemPropType {
    link: string
    name: string
    icon: LucideIcon
    index: number
}

const SideBarMenuItem = ({link, name, icon,index}: SideBarMenuItemPropType) => {
    const ThisIcon = icon
    return (
        <Link href={link} className={["sidebarMenuItem",`sidebarMenuItem${index}`].join(" ")}>
                <ThisIcon className={"sideIcon"}></ThisIcon>
                <div className={"sidebarItemsName"}>{name}</div>
        </Link>
    );
};

export default SideBarMenuItem;