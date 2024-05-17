'use client'

import TimeBlocking from "@/app/i/time-blocking/TimeBlocking";
import Heading from "@/components/ui/Heading";

export default function IPage() {

    return (
        <div className={"page"}>
            <Heading value={"TimeBlock"}/>
            <TimeBlocking/>
        </div>)
};
