'use client'
import Heading from "@/components/ui/Heading";
import Pomodoro from "@/app/i/pomodoro/Pomodoro";

const HomePage = () => {
    return (
        <div>
            <Heading value={"Pomodoro"}/>
            <Pomodoro/>
        </div>
    );
};

export default HomePage;