import {Metadata} from "next";
import {NO_INDEX_PAGE} from "@/constants/seo.constants";
import Heading from '@/components/ui/Heading'
import Statistics from "@/app/i/Statistics";
import classes from './Statistic.module.css'
import DashboardLayout from "@/components/dashboardlayout/DashboardLayout";


export const metadata: Metadata = {
    title: 'Dashboard',
    ...NO_INDEX_PAGE
}

export default function IPage() {
    return (
            <div className={"page"}>
                <Heading value={"Statistic"}/>
                <Statistics/>
            </div>
    )
}