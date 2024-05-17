import {SIDEBARMENU} from "@/components/dashboardlayout/sidebar/sidebarmain/menu/SidebarMenu.data";

import SideBarMenuItem from "@/components/dashboardlayout/sidebar/sidebarmain/menu/sidebarmenuitem/SideBarMenuItem";


const SidebarMenu = () => {
    return (
        <div className={"sidebar"}>
            {SIDEBARMENU.map((e,index)=>{
                return <SideBarMenuItem key={`sidebar${index}`} link={e.link} name={e.name} icon={e.icon} index={index}/>
            })}
        </div>
    );
};

export default SidebarMenu;