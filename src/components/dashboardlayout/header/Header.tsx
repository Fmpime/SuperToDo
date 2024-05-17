"use client"

import {Profile} from "@/components/dashboardlayout/header/profile/Profile";

export function Header() {
    return (
        <div className={"header"}>
            <div>Super To Do</div>
            <div></div>
            <Profile></Profile>
        </div>
    )
}