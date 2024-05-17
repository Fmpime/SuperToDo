import {useState} from "react";
import {useTimer} from "@/app/i/pomodoro/pomodoroHooks/useTimer";


const PomodoroTimer = ({items}) => {
    const time = useTimer(items)
    return (
        <div>
            <div>{time}</div>
        </div>
    );
};

export default PomodoroTimer;