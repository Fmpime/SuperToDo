import type {PropsWithChildren} from "react";
import {Sidebar} from "@/components/dashboardlayout/sidebar/Sidebar"
import {Header} from "@/components/dashboardlayout/header/Header";

const DashboardLayout = ({children}: PropsWithChildren<unknown>) => {
    return (
        <div className={"layout"}>
            <Header></Header>
            <div className={"mainLayout"}>
                <Sidebar></Sidebar>
                <main className={"main"}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;