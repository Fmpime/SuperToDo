import {CalendarIcon, LayoutDashboard, SettingsIcon, SquareKanban, TimerIcon} from "lucide-react";
import {DASHBOARD_PAGES} from "@/config/pages-url.config";
import {SidebarMenuInterface} from "@/components/dashboardlayout/sidebar/sidebarmain/menu/SidebarMenu.interface";


export const SIDEBARMENU:SidebarMenuInterface[] = [
    {
        link:DASHBOARD_PAGES.HOME,
        name:"Dashboard",
        icon:LayoutDashboard,
    },
    {
        link:DASHBOARD_PAGES.TIME_BLOCKING,
        name:"Time Blocking",
        icon:CalendarIcon,
    },
    {
        link:DASHBOARD_PAGES.TASKS,
        name:"Tasks",
        icon:SquareKanban ,
    },
    {
        link:DASHBOARD_PAGES.TIMER,
        name:"Pomodoro",
        icon:TimerIcon,
    },
    {
        link:DASHBOARD_PAGES.SETTINGS,
        name:"Settings",
        icon:SettingsIcon,
    },


]